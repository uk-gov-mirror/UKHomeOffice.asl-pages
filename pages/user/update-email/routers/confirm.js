const { Router } = require('express');
const { omit } = require('lodash');
const schema = require('../schema/index');

module.exports = () => {
  const app = Router();

  app.use((req, res, next) => {
    req.breadcrumb('account.updateEmail.confirm');
    res.locals.static.schema = Object.assign({}, omit(schema, ['emailConfirm', 'password']));
    res.locals.static.values = req.session.form[req.model.id].values;
    next();
  });

  app.post('/', (req, res, next) => {
    const opts = {
      method: 'PUT',
      json: {
        ...req.session.form[req.model.id].values
      }
    };

    console.log({ opts });

    req.api('/me/email', opts)
      .then(() => res.redirect(req.buildRoute('account.updateEmail.success')))
      .catch(next);
  });

  return app;
};
