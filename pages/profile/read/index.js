const page = require('../../../lib/page');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.get('/', (req, res, next) => {
    req.breadcrumb('profile.view');
    next();
  });

  app.get('/', (req, res, next) => {
    res.locals.static.isUser = req.user.profile.id === req.profileId;
    res.locals.static.profileRole = req.profile.establishments.find(est => est.id === req.establishmentId).role;
    next();
  });

  return app;
};
