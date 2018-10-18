const page = require('../../../lib/page');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use('/', (req, res, next) => {
    const establishment = req.user.profile.establishments.find(e => e.id === req.establishmentId);
    res.locals.static.establishment = establishment;
    res.locals.static.profile = req.profile;
    res.locals.static.pilApplication = {
      id: 'create'
    };
    next();
  });

  return app;
};
