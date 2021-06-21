const { Router } = require('express');
const form = require('../../../common/routers/form');
const schema = require('../../schema/deadline-passed');
const { UnauthorisedError } = require('@asl/service/errors');

module.exports = () => {
  const app = Router();

  app.use((req, res, next) => {
    if (!req.user.profile.asruUser) {
      return next(new UnauthorisedError());
    }
    next();
  });

  app.use((req, res, next) => {
    req.model = { id: req.task.id };
    res.locals.static.task = req.task;
    next();
  });

  app.use(form({ schema }));

  app.post('/', (req, res, next) => {
    return res.redirect(req.buildRoute('task.read', { suffix: 'confirm' }));
  });

  return app;
};
