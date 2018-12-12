const { Router } = require('express');

module.exports = () => {
  const app = Router();

  app.use((req, res, next) => {
    req.model = { id: `${req.task.id}-success` };
    next();
  });

  app.get('/', (req, res, next) => {
    const id = `${req.task.id}-decision`;

    const formValues = req.session.form[id].values;
    const decision = formValues.decision;

    res.locals.static.task = req.task;
    res.locals.static.decision = decision;

    if (req.session.form && req.session.form[id]) {
      delete req.session.form[id];
    }
    next();
  });

  return app;
};
