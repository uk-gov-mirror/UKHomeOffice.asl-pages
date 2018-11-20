const page = require('../../../lib/page');
const form = require('../../common/routers/form');
const schemaGenerator = require('../schema');
const confirm = require('./routers/confirm');

let schema = {};

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname,
    paths: ['/confirm', '/success']
  });

  app.use((req, res, next) => {
    req.model = { id: `${req.task.id}-decision` };
    schema = schemaGenerator(req.task);

    console.log(schema.decision.options);
    next();
  });

  app.use('/', form({
    schema: {
      ...schema,
      ...schema.decision.options[1].reveal
    },
    locals: (req, res, next) => {
      res.locals.static.task = req.task;
      res.locals.static.schema = schema;
      next();
    }
  }));

  app.post('/', (req, res, next) => {
    return res.redirect(req.buildRoute('task.confirm', { taskId: req.task.id }));
  });

  app.use('/confirm', confirm());

  return app;
};
