const { Router } = require('express');
const read = require('./read');
const list = require('./list');

module.exports = settings => {
  const app = Router();

  app.param('taskId', (req, res, next, taskId) => {
    return req.api(`/tasks/${taskId}`)
      .then(response => {
        req.taskId = taskId;
        req.task = response.json.data;
      })
      .then(() => next())
      .catch(next);
  });

  app.use('/:taskId', read(settings));
  app.use('/', list(settings));

  return app;
};
