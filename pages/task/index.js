const { Router } = require('express');
const read = require('./read');

module.exports = settings => {
  const app = Router();

  app.param('taskId', (req, res, next, taskId) => {
    return req.api(`/tasks/${taskId}`)
      .then(response => {
        req.task = response.json.data;
      })
      .then(() => next())
      .catch(next);
  });

  app.use('/:taskId', read(settings));

  return app;
};
