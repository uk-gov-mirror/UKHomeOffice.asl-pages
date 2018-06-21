const page = require('../../../lib/page');
const schema = require('../schema');

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings
  });

  app.get('/', (req, res, next) => {
    res.locals.model = req.model;
    res.locals.static.fields = Object.keys(schema);
    next();
  });

  return app;
};
