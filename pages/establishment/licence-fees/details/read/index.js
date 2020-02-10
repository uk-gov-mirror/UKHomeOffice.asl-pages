const { page } = require('@asl/service/ui');
const schema = require('../schema');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use((req, res, next) => {
    res.locals.model = req.establishment.billing;
    res.locals.static.schema = schema;
    next();
  });

  return app;
};
