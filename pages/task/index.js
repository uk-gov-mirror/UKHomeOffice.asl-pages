const { Router } = require('express');

module.exports = () => {
  const app = Router({ mergeParams: true });

  app.param('taskId', (req, res, next, taskId) => {
    return req.api(`/tasks/${taskId}`)
      .then(response => {
        console.log(response.json.data);
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
