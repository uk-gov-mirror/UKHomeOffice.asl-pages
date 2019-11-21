const { Router } = require('express');
const routes = require('./routes');

module.exports = settings => {
  const app = Router({ mergeParams: true });

  app.param('pilId', (req, res, next, pilId) => {
    if (pilId === 'create') {
      return next('route');
    }
    return req.api(`/establishment/${req.establishmentId}/profiles/${req.profileId}/pil/${pilId}`)
      .then(({ json: { data, meta } }) => {
        req.model = data;
        req.pil = data;
        req.pilId = pilId;
        req.model.openTasks = meta.openTasks || [];
      })
      .then(() => next())
      .catch(next);
  });

  return app;
};

module.exports.routes = routes;
