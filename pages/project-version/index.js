const { Router } = require('express');
const { get, set } = require('lodash');
const bodyParser = require('body-parser');
const { getVersion, getComments, getChangedValues } = require('./middleware');
const { canViewTransferredProject } = require('../project/middleware');
const extractComments = require('./lib/extract-comments');
const routes = require('./routes');

module.exports = settings => {
  const app = Router({ mergeParams: true });

  app.use(bodyParser.json({ limit: settings.bodySizeLimit }));

  app.use(getVersion(), getComments(['grant', 'transfer']), (req, res, next) => {
    res.locals.static.establishment = req.project.establishment;
    res.locals.static.project = {
      ...req.project,
      title: req.project.title || 'Untitled project'
    };
    next();
  });

  app.use(canViewTransferredProject);

  app.use((req, res, next) => {
    req.breadcrumb('dashboard');
    req.user.can('project.read.single', req.params)
      .then(canViewProject => {
        if (canViewProject) {
          req.breadcrumb('establishment.dashboard');
          req.breadcrumb('project.list');
          req.breadcrumb('project.read');
        } else {
          if (req.project.openTasks && req.project.openTasks.length) {
            req.breadcrumb('task.list');
            req.breadcrumb('task.read.root');
          }
          set(res.locals, 'static.content.breadcrumbs.projectVersion.read', '{{project.title}}');
        }
      })
      .then(() => next())
      .catch(next);

  });

  app.get('/question/:question', (req, res, next) => {
    getChangedValues(req.params.question, req)
      .then(changes => res.json(changes))
      .catch(next);
  });

  app.post('/comment', (req, res, next) => {
    const taskId = get(req.project, 'openTasks[0].id');
    if (!taskId) {
      return next();
    }
    const { field, comment } = req.body;
    const params = {
      method: 'POST',
      json: {
        comment,
        meta: {
          field,
          versionId: req.versionId
        }
      }
    };
    req.api(`/task/${taskId}/comment`, params)
      .then(response => {
        const id = get(response, 'json.data.json.data.comments[0].id');
        res.json({ id });
      })
      .catch(next);
  });

  app.put('/comment/:commentId', (req, res, next) => {
    const id = req.params.commentId;
    const taskId = get(req.project, 'openTasks[0].id');
    if (!taskId) {
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

    req.api(`/task/${taskId}/comment/${id}`, params)
      .then(response => {
        res.json(extractComments(response.json.data));
      })
      .catch(next);
  });

  app.delete('/comment/:commentId', (req, res, next) => {
    const id = req.params.commentId;
    const taskId = get(req.project, 'openTasks[0].id');
    if (!taskId) {
      return next();
    }
    req.api(`/task/${taskId}/comment/${id}`, { method: 'DELETE' })
      .then(() => res.json({ id }))
      .catch(next);
  });

  return app;
};

module.exports.routes = routes;
