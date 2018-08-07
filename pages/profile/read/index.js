const page = require('../../../lib/page');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  // app.get('/', (req, res, next) => {
  //   req.api(`/establishment/${req.establishment}/profile/${req.profile}`)
  //     .then(response => {
  //       res.locals.static.establishment = response.json.meta.establishment;
  //       res.locals.model = response.json.data;
  //     })
  //     .then(() => next())
  //     .catch(next);
  // });

  return app;
};
