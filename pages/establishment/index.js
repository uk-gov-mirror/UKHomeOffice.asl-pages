const { Router } = require('express');
const routes = require('./routes');

module.exports = settings => {
  const app = Router({ mergeParams: true });

  app.use(
    (req, res, next) => {
      req.api(`/establishment/${req.establishmentId}`)
        .then(response => {
          req.establishment = response.json.data;
          req.establishment.openTasks = response.json.meta.openTasks || [];
          const pelh = req.establishment.roles.find(r => r.type === 'pelh');
          const nprc = req.establishment.roles.find(r => r.type === 'nprc');
          const holc = req.establishment.roles.find(r => r.type === 'holc');
          if (pelh) {
            req.establishment.pelh = pelh.profile;
          }
          if (nprc && (!pelh || nprc.profile.id !== pelh.profile.id)) {
            req.establishment.nprc = nprc.profile;
          }
          if (holc) {
            req.establishment.holc = holc.profile;
          }
          res.locals.static.establishment = req.establishment;
          res.locals.static.profile = req.user.profile;

        })
        .then(() => next())
        .catch(next);
    }
  );

  return app;
};

module.exports.routes = routes;
