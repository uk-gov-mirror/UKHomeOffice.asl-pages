const { page } = require('@asl/service/ui');
const relatedTasks = require('../../common/middleware/related-tasks');

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

  app.get('/', (req, res, next) => relatedTasks({
    model: 'profile',
    modelId: req.user.profile.id
  })(req, res, next));

  return app;
};
