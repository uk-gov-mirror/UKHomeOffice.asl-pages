const page = require('../../../lib/page');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.get('/categories', (req, res, next) => {
    console.log('get categories');
    next();
  });

  return app;
};
