const { page } = require('@asl/service/ui');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use((req, res, next) => {
    res.locals.static.project = req.project;
    res.locals.static.basename = req.originalUrl.replace(/\/downloads$/, '');
    next();
  });

  app.use((req, res) => res.sendResponse());

  return app;
};
