const { Router } = require('express');
const routes = require('./routes');

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

  return app;
};

module.exports.routes = routes;
