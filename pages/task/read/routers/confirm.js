const form = require('../../../common/routers/form');
const { Router } = require('express');

module.exports = () => {
  const app = Router();

  app.use(form({
    locals: (req, res, next) => {
      res.locals.static.task = req.task;
      next();
    }
  }));

  app.post('/confirm', (req, res, next) => {
    const params = {};

    const opts = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(params)
    };
    return req.api(`/tasks/${req.task.id}/`, opts)
      .then(() => next())
      .catch(next);
  });

  app.post('/confirm', (req, res, next) => {
    return res.redirect(req.buildRoute('task.success', {establishment: req.establishmentId}));
  });

  return app;
};
