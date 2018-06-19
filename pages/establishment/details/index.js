const page = require('../../../lib/page');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.get('/', (req, res, next) => {
    req.api(`/establishment/${req.establishment}`)
      .then(({ json: { data } }) => {
        res.locals.static.establishment = data;
      })
      .then(() => next())
      .catch(next);
  });

  return app;
};
