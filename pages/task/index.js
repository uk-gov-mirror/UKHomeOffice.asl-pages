const { Router } = require('express');
const routes = require('./routes');
const { validateUuidParam } = require('../common/middleware');

module.exports = settings => {
  const app = Router();

  app.param('taskId', validateUuidParam());
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
