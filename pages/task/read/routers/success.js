const { Router } = require('express');
const { merge, get, set } = require('lodash');
const successContent = require('../../../common/content/success-messages');

module.exports = () => {
  const app = Router();

  app.use((req, res, next) => {
    req.model = { id: req.task.id };
    next();
  });

  app.use((req, res, next) => {
    const id = req.model.id;
    const status = get(req.session, `form.${id}.values.status`, get(req.session, `form.${id}.values.storeStatus`));
    req.status = status;
    res.locals.static.profile = req.task.data.changedBy;
    next();
  });

  app.use((req, res, next) => {
    const model = ['place', 'role', 'establishment'].includes(req.task.data.model)
      ? 'pel'
      : req.task.data.model;
    const content = get(successContent, `${model}.${req.task.type}.${req.status}`, successContent.fallback);
    merge(res.locals.static.content, { success: content });
    next();
  });

  app.get('/', (req, res, next) => {
    const id = req.model.id;
    delete req.session.form[id];
    // we need to clear the session so previous form values aren't
    // persisted, however we need to use the status if page is refreshed
    set(req.session, `form.${id}.values.storeStatus`, req.status);
    next();
  });

  return app;
};
