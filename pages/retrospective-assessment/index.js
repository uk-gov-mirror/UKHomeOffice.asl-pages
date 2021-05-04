const { Router } = require('express');
const bodyParser = require('body-parser');
const { get } = require('lodash');
const routes = require('./routes');
const { getComments, getChangedValues, loadRa } = require('../project-version/middleware');
const extractComments = require('../project-version/lib/extract-comments');

module.exports = settings => {
  const app = Router({ mergeParams: true });

  app.use(bodyParser.json({ limit: settings.bodySizeLimit }));

  app.use((req, res, next) => {
    req.api(`/establishment/${req.establishmentId}/project/${req.projectId}/retrospective-assessment/${req.raId}`)
      .then(({ json: { data, meta } }) => {
        req.retrospectiveAssessment = data;
        req.project = req.retrospectiveAssessment.project;
        req.project.openTasks = meta.openTasks;
      })
      .then(() => next())
      .catch(next);
  });

  app.use(loadRa);

  app.use(getComments('grant-ra'));

  app.use((req, res, next) => {
    req.api(`/establishment/${req.establishmentId}/project/${req.projectId}/project-version/${req.project.granted.id}`)
      .then(response => {
        req.version = response.json.data;
      })
      .then(() => next())
      .catch(next);
  });

  app.post('/comment', (req, res, next) => {
    const task = get(req.project, 'openTasks', []).find(task => task.data.action === 'grant-ra');
    if (!task) {
      return next();
    }
    const { field, comment } = req.body;
    const params = {
      method: 'POST',
      json: {
        comment,
        meta: {
          field,
          raId: req.raId
        }
      }
    };
    req.api(`/task/${task.id}/comment`, params)
      .then(response => {
        const id = get(response, 'json.data.json.data.comments[0].id');
        res.json({ id });
      })
      .catch(next);
  });

  app.get('/question/:question', (req, res, next) => {
    getChangedValues(req.params.question, req, 'retrospective-assessments')
      .then(changes => res.json(changes))
      .catch(next);
  });

  app.put('/comment/:commentId', (req, res, next) => {
    const id = req.params.commentId;
    const task = get(req.project, 'openTasks', []).find(task => task.data.action === 'grant-ra');
    if (!task) {
      return next();
    }
    const { field, comment } = req.body;
    const params = {
      method: 'PUT',
      json: {
        comment,
        meta: {
          field,
          versionId: req.versionId
        }
      }
    };

    req.api(`/task/${task.id}/comment/${id}`, params)
      .then(response => {
        res.json(extractComments(response.json.data));
      })
      .catch(next);
  });

  app.delete('/comment/:commentId', (req, res, next) => {
    const id = req.params.commentId;
    const task = get(req.project, 'openTasks', []).find(task => task.data.action === 'grant-ra');
    if (!task) {
      return next();
    }
    req.api(`/task/${task.id}/comment/${id}`, { method: 'DELETE' })
      .then(() => res.json({ id }))
      .catch(next);
  });

  return app;
};

module.exports.routes = routes;
