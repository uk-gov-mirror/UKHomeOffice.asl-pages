const { Router } = require('express');
const { omit, pick } = require('lodash');
const schema = require('../schema/index');

module.exports = () => {
  const app = Router();

  app.use((req, res, next) => {
    if (req.query.edit) {
      return res.redirect(req.buildRoute('account.updateEmail.base'));
    }

    if (req.query.cancel) {
      delete req.session.form[req.model.id];
      return res.redirect(req.buildRoute('account.menu'));
    }
    next();
  });

  app.use((req, res, next) => {
    req.breadcrumb('account.updateEmail.confirm');
    // schema and values needed for the diff component
    res.locals.static.schema = Object.assign({}, omit(schema, ['emailConfirm', 'password']));
    res.locals.static.values = req.session.form[req.model.id].values;
    next();
  });

  app.post('/', (req, res, next) => {
    const opts = {
      method: 'PUT',
      json: {
        data: {
          ...pick(req.session.form[req.model.id].values, 'email')
        }
      }
    };

    req.api('/me/email', opts)
      .then(() => res.redirect(req.buildRoute('account.updateEmail.success')))
      .catch(next);
  });

  return app;
};
