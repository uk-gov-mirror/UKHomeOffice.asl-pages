const { Router } = require('express');
const { get } = require('lodash');
const bodyParser = require('body-parser');
const read = require('./read');
const pdf = require('./pdf');
const { getVersion, getComments } = require('./middleware');

module.exports = settings => {
  const app = Router();

  app.use(getVersion());

  app.use(getComments());

  app.post('/comment', bodyParser.json(), (req, res, next) => {
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
      .then(() => res.json({}))
      .catch(next);
  });

  app.use('/pdf', pdf(settings));
  app.use('/*', read());

  return app;
};
