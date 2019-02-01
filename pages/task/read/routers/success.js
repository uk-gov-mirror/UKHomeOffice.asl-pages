const { Router } = require('express');
const successRouter = require('../../../common/routers/success');

module.exports = () => {
  const app = Router();

  app.use((req, res, next) => {
    req.breadcrumb('task.success');
    req.model = { id: `${req.task.id}-success` };
    next();
  });

  app.get('/', (req, res, next) => {
    const id = `${req.task.id}-decision`;

    const formValues = req.session.form[id].values;
    const status = formValues.status;

    res.locals.static.task = req.task;
    res.locals.static.status = status;
    next();
  });

  app.use(successRouter());

  return app;
};
