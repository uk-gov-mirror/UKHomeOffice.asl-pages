const page = require('../../../lib/page');
const form = require('../../common/routers/form');
const schema = require('../schema');
const confirm = require('./routers/confirm');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname,
    paths: ['/confirm', '/success']
  });

  app.use((req, res, next) => {
    req.model = { id: `${req.task.id}-approve` };
    next();
  });

  app.use('/', form({
    schema: {
      ...schema,
      ...schema.approve.options[1].reveal
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
