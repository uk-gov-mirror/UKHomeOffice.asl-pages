const { Router } = require('express');
const { merge, get } = require('lodash');
const successContent = require('../../../common/content/success-messages');

const getType = (model, req) => {
  if (model === 'pel' || model === 'profile') {
    return Promise.resolve('amendment');
  }
  return Promise.resolve()
    .then(() => req.api(`/establishment/${req.task.data.data.establishmentId}/${model}/${req.task.data.id}`))
    .then(({ json: { data } }) => data.status === 'active' ? 'amendment' : 'application');
};

module.exports = () => {
  const app = Router();

  app.use((req, res, next) => {
    req.breadcrumb('task.success');
    req.model = { id: req.task.id };
    next();
  });

  app.use((req, res, next) => {
    const status = get(req.session, `form.${req.model.id}.values.status`);
    req.status = status;

    res.locals.static.profile = req.task.data.changedBy;
    next();
  });

  app.use((req, res, next) => {
    const model = req.task.data.model === 'place' || req.task.data.model === 'role' ? 'pel' : req.task.data.model;
    getType(model, req)
      .then(type => {
        const content = get(successContent, `${model}.${type}.${req.status}`, successContent.fallback);
        merge(res.locals.static.content, { success: content });
      })
      .then(() => next())
      .catch(next);
  });

  app.get('/', (req, res, next) => {
    if (req.session.form && req.session.form[req.model.id]) {
      delete req.session.form[req.model.id];
    }
    next();
  });

  return app;
};
