const { Router } = require('express');
const { UnauthorisedError } = require('@asl/service/errors');

module.exports = () => {
  const app = Router();

  app.use((req, res, next) => {
    if (!req.user.profile.asruUser || !req.user.profile.asruAdmin) {
      return next(new UnauthorisedError());
    }
    req.model = req.task;
    next();
  });

  app.get('/', (req, res, next) => {
    req.session.form[req.model.id].values = { status: 'discarded-by-asru' };
    return res.redirect(req.buildRoute('task.read', { suffix: 'confirm' }));
  });

  return app;
};
