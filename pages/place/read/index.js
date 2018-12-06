const { page } = require('@asl/service/ui');
const { schema } = require('../schema');

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings
  });

  app.get('/', (req, res, next) => {
    Object.assign(res.locals, { model: req.model });
    Object.assign(res.locals.static, { schema });
    next();
  });

  return app;
};
