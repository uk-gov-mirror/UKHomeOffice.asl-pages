const form = require('../../../common/routers/form');
const { Router } = require('express');

module.exports = () => {
  const app = Router();

  app.use((req, res, next) => {
    req.model = { id: `${req.task.id}-confirm` };
    next();
  });

  app.use(form({
    locals: (req, res, next) => {
      res.locals.static.task = req.task;
      next();
    }
  }));

  app.post('/', (req, res, next) => {
    const applicationCanProceed = stepId => {
      return req.task.nextSteps.find(nextStep => nextStep.id === stepId).proceed;
    };

    const formValues = req.session.form[`${req.task.id}-decision`].values;
    const stepId = formValues.decision;
    const params = { status: stepId };

    if (!applicationCanProceed(stepId)) {
      params.reason = formValues[`${stepId}-reason`];
    }

    console.log(params);

    const opts = {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(params)
    };

    return req.api(`/tasks/${req.task.id}/status`, opts)
      .then(() => next())
      .catch(next);
  });

  app.post('/', (req, res, next) => {
    return res.redirect(req.buildRoute('task.success', { taskId: req.task.id }));
  });

  return app;
};
