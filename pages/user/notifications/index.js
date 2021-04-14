const { Router } = require('express');
const routes = require('./routes');

module.exports = () => {
  const app = Router({ mergeParams: true });

  app.param('notificationId', (req, res, next, notificationId) => {
    req.api(`/me/notification/${notificationId}`)
      .then(({ json: { data } }) => {
        req.notification = data;
        req.notificationId = notificationId;
        res.locals.static.notification = req.notification;
      })
      .then(() => next())
      .catch(next);
  });

  return app;
};

module.exports.routes = routes;
