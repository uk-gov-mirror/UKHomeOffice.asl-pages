const page = require('../../../lib/page');
const router = require('./router');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use(router());

  return app;
};
