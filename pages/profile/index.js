const page = require('../../lib/page');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.get('/', (req, res, next) => {
    req.api(`/establishment/${req.establishment}/profile/${req.profile}`)
      .then(response => {
        res.locals.static.establishment = response.json.meta.establishment;
        if (response.json.data) {
          res.locals.item = response.json.data;
        } else {
          throw new Error('Profile not found');
        }
      })
      .then(() => next())
      .catch(next);
  });

  return app;
};
