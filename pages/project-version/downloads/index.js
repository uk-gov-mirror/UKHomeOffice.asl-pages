const { page } = require('@asl/service/ui');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use((req, res, next) => {
    res.locals.static.version = req.version;
    res.locals.static.basename = req.originalUrl.replace(/\/downloads$/, '');
    res.locals.static.isAsru = req.user.profile.asruUser;
    next();
  });

  app.use((req, res) => res.sendResponse());

  return app;
};
