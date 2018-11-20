const page = require('../../../lib/page');
const form = require('../../common/routers/form');
const schemaGenerator = require('../schema');
const confirm = require('./routers/confirm');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname,
    paths: ['/confirm', '/success']
  });

  app.use((req, res, next) => {
    req.model = { id: `${req.task.id}-decision` };
    next();
  });

  app.use('/', form(Object.assign({
    configure: (req, res, next) => {
      const schema = schemaGenerator(req.task);
      req.form.schema = schema;
      res.locals.static.schema = schema;
      next();
    },
    locals: (req, res, next) => {
      res.locals.static.task = req.task;
      next();
    }
  })));

  app.post('/', (req, res, next) => {
    return res.redirect(req.buildRoute('task.confirm', { taskId: req.task.id }));
  });

  app.use('/confirm', confirm());

  return app;
};
