const page = require('../../../lib/page');
const add = require('../routers/add-or-edit');

module.exports = settings => {
  const app = page({
    root: __dirname,
    paths: ['/confirm', '/success'],
    ...settings
  });

  app.use(add());

  app.use((req, res, next) => {
    Object.assign(res.locals, { model: res.locals.static.values });
    return next();
  });

  return app;
};
