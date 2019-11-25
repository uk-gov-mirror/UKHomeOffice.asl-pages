const { Router } = require('express');
const { get } = require('lodash');
const bodyParser = require('body-parser');
const pdf = require('./pdf');
const docx = require('./docx');
const { getVersion, getComments, getChangedValues } = require('./middleware');
const extractComments = require('./lib/extract-comments');
const routes = require('./routes');

module.exports = settings => {
  const app = Router({ mergeParams: true });

  app.use(bodyParser.json({ limit: '5mb' }));

  app.use(getVersion());

  app.use(getComments());

  app.get('/question/:question', (req, res, next) => {
    getChangedValues(req.params.question, req)
      .then(changes => res.json(changes));
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
        const id = get(response, 'json.data.json.data.activityLog[0].id');
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

  app.use('/docx', docx(settings));
  app.use('/pdf', pdf(settings));

  return app;
};

module.exports.routes = routes;
