const { Router } = require('express');
const form = require('../../../common/routers/form');
const schema = require('../../schema/deadline-passed');

module.exports = () => {
  const app = Router();

  app.use((req, res, next) => {
    req.model = { id: req.task.id };
    next();
  });

  app.use(form({ schema }));

  app.post('/', (req, res, next) => {
    return res.redirect(req.buildRoute('task.read', { suffix: 'confirm' }));
  });

  return app;
};
