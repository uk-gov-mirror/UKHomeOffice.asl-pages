const { Router } = require('express');
const bodyParser = require('body-parser');

const defaultMiddleware = (req, res, next) => next();

module.exports = ({
  model = 'model',
  cancelPath = '/',
  declaration = true,
  schema,
  submitChange = defaultMiddleware,
  configure = defaultMiddleware,
  checkSession = defaultMiddleware,
  getValues = defaultMiddleware,
  locals = defaultMiddleware
} = {}) => {
  const app = Router();

  const _configure = (req, res, next) => {
    req.form = req.form || {};
    req.model = req.model || {};
    req.model.id = req.model.id || `new-${model}`;
    req.form.schema = schema;
    return configure(req, res, next);
  };

  const _checkDeclaration = (req, res, next) => {
    if (declaration) {
      if (req.body['declaration-checkbox'] === 'true') {
        return next();
      }
      return next({ validation: { declaration: 'unchecked' } });
    }
    return next();
  };

  const _getErrors = (req, res, next) => {
    req.form.validationErrors = req.session.form[req.model.id].validationErrors;
    next();
  };

  const _processQuery = (req, res, next) => {
    const { clear, edit } = req.query;
    if (clear) {
      delete req.session.form[req.model.id];
      res.redirect(cancelPath);
    }
    if (edit) {
      res.redirect(req.baseUrl.replace(/\/confirm/, ''));
    }
    next();
  };

  const _checkSession = (req, res, next) => {
    if (req.session.form && req.session.form[req.model.id]) {
      return checkSession(req, res, next);
    }
    res.redirect(req.baseUrl.replace(/\/confirm/, ''));
  };

  const _getValues = (req, res, next) => {
    req.form.values = req.session.form[req.model.id].values;
    return getValues(req, res, next);
  };

  const _locals = (req, res, next) => {
    Object.assign(res.locals, { model: req.model });
    Object.assign(res.locals.static, { values: req.form.values, errors: req.form.validationErrors });
    return locals(req, res, next);
  };

  const submit = (req, res, next) => {
    if (req.session.form && req.session.form[req.model.id]) {
      return submitChange(req, res, next);
    }
    return res.redirect(req.originalUrl);
  };

  const errorHandler = (err, req, res, next) => {
    if (err.validation) {
      Object.assign(req.session.form[req.model.id], { validationErrors: err.validation });
      return res.redirect(req.originalUrl);
    }
    return next(err);
  };

  app.get('/',
    _configure,
    _getErrors,
    _processQuery,
    _checkSession,
    _getValues,
    _locals
  );

  app.post('/',
    bodyParser.urlencoded({ extended: false }),
    _configure,
    _checkDeclaration,
    submit,
    errorHandler
  );

  return app;
};
