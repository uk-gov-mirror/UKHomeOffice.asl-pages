const { Router } = require('express');
const { get } = require('lodash');
const bodyParser = require('body-parser');
const read = require('./read');
const pdf = require('./pdf');
const { getVersion, getComments, getChangedValues } = require('./middleware');

module.exports = settings => {
  const app = Router({ mergeParams: true });

  app.use(bodyParser.json());

  app.use(getVersion());

  app.use(getComments());

  app.get('/question/:question', (req, res, next) => {
    const key = req.params.question;
    getChangedValues(key, req)
      .then(changes => {
        res.json(changes)
      });
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

  app.use('/pdf', pdf(settings));
  app.use('/*', read());

  return app;
};
