const { Router } = require('express');
const routes = require('./routes');

const handlePplAmendmentReason = task => {
  // previously we used task.data.meta.comments for the amendment reason, now it has it's own property
  if (task.data.model === 'project' && task.type === 'amendment' && !task.data.meta.reason && task.data.meta.comments) {
    task.data.meta.reason = task.data.meta.comments;
    delete task.data.meta.comments;
  }
  return task;
};

module.exports = settings => {
  const app = Router();

  app.param('taskId', (req, res, next, taskId) => {
    return req.api(`/tasks/${taskId}`)
      .then(response => {
        req.taskId = taskId;
        const task = response.json.data;
        req.task = handlePplAmendmentReason(task);
      })
      .then(() => next())
      .catch(next);
  });

  return app;
};

module.exports.routes = routes;
