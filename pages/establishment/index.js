const { Router } = require('express');
const { permissions } = require('../../lib/middleware');
const dashboard = require('./dashboard');
const details = require('./details');

module.exports = () => {
  const app = Router({ mergeParams: true });

  app.use(
    permissions('establishment.read'),
    (req, res, next) => {
      req.api(`/establishment/${req.establishmentId}`)
        .then(response => {
          req.establishment = response.json.data;
          const pelh = req.establishment.roles.find(r => r.type === 'pelh');
          const nprc = req.establishment.roles.find(r => r.type === 'nprc');
          if (pelh) {
            req.establishment.pelh = pelh.profile;
          }
          if (nprc) {
            req.establishment.nprc = nprc.profile;
          }
          res.locals.static.establishment = req.establishment;
          res.locals.static.profile = req.user.profile;

        })
        .then(() => next())
        .catch(next);
    }
  );

  app.get('/', dashboard());
  app.use('/details', details());

  return app;
};
