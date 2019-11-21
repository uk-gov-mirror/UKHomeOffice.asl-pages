const { page } = require('@asl/service/ui');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use((req, res, next) => {
    req.api('/me')
      .then(({ json: { data, meta } }) => {
        req.model = data;
        req.model.openTasks = meta.openTasks || [];
        res.locals.model = req.model;
      })
      .then(() => next())
      .catch(next);
  });

  app.get('/', (req, res, next) => {
    res.locals.static.profile = req.user.profile;
    next();
  });

  return app;
};
