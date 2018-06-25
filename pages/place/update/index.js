const page = require('../../../lib/page');
const edit = require('../routers/add-or-edit');

module.exports = settings => {
  const app = page({
    root: __dirname,
    paths: ['/confirm', '/success'],
    ...settings
  });

  app.use(edit());

  app.use((req, res, next) => {
    Object.assign(res.locals, { model: req.model });
    return next();
  });

  return app;
};
