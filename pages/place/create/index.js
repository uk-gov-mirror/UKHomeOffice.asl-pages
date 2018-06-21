const page = require('../../../lib/page');
const add = require('../routers/add-or-edit');

module.exports = settings => {
  const app = page({
    root: __dirname,
    paths: ['/confirm', '/success'],
    ...settings
  });

  app.use(add());

  return app;
};
