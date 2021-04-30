const { page } = require('@asl/service/ui');
const { loadRa } = require('../middleware');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use(loadRa);

  app.use((req, res, next) => {
    res.locals.static.project = req.project;
    res.locals.static.version = req.version;
    res.locals.static.basename = req.originalUrl.replace(/\/nts$/, '');
    res.locals.static.isAsru = req.user.profile.asruUser;
    next();
  });

  app.use((req, res) => res.sendResponse());

  return app;
};
