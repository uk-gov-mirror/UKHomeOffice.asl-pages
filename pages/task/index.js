const { Router } = require('express');

module.exports = () => {
  console.log('task/index.js loaded');

  const app = Router({ mergeParams: true });

  app.param('taskId', (req, res, next, taskId) => {
    console.log('found a taskId');

    return req.api(`/tasks/${taskId}`)
      .then(response => {
        console.log(response);
        req.task = response.json.data;
      })
      .then(() => next())
      .catch(next);
  });

  app.get('/tasks/:taskId', (req, res, next) => {
    console.log('here');
    console.log(req.task);
    next();
  });

  return app;
};
