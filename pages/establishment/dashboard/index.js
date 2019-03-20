const { page } = require('@asl/service/ui');
const { permissions } = require('../../../lib/middleware');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.get('/',
    permissions('establishment.read'),
    (req, res, next) => {
      req.api(`/establishment/${req.establishmentId}`)
        .then(response => {
          req.establishment = response.json.data;
          res.locals.static.establishment = response.json.data;
          res.locals.static.pelh = req.establishment.roles.find(r => r.type === 'pelh');
          res.locals.static.nprc = req.establishment.roles.find(r => r.type === 'nprc');
        })
        .then(() => next())
        .catch(next);
    }
  );

  return app;
};
