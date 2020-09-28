const { Router } = require('express');
const routes = require('./routes');

module.exports = settings => {
  const app = Router({ mergeParams: true });

  app.param('pilId', (req, res, next, pilId) => {
    req.api(`/establishment/${req.establishmentId}/profile/${req.profileId}/pil/${pilId}`)
      .then(response => {
        req.pilId = pilId;
        req.pil = response.json.data;
        req.pil.openTasks = response.json.meta.openTasks;
        req.model = req.pil;
        next();
      })
      .catch(next);
  });

  app.use((req, res, next) => {
    req.model = req.pil;
    next();
  });

  return app;
};

module.exports.routes = routes;
