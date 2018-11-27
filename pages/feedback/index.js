const page = require('../../lib/page');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.get('/', (req, res, next) => {
    req.breadcrumb('feedback');
    next();
  });

  return app;
};
