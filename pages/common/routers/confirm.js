const { Router } = require('express');

const defaultMiddleware = (req, res, next) => next();

module.exports = ({
  model = 'model',
  cancelPath = '/',
  schema,
  submitChange = defaultMiddleware,
  configure = defaultMiddleware,
  checkSession = defaultMiddleware,
  getValues = defaultMiddleware,
  locals = defaultMiddleware,
  cancelEdit = (req, res, next) => {
    return res.redirect(cancelPath);
  },
  editAnswers = (req, res, next) => {
    return res.redirect(req.baseUrl.replace(/\/confirm/, ''));
  }
} = {}) => {
  const app = Router();

  const _configure = (req, res, next) => {
    req.form = req.form || {};
    req.model = req.model || {};
    req.model.id = req.model.id || `new-${model}`;
    req.form.schema = schema;
    return configure(req, res, next);
  };

  const _processQuery = (req, res, next) => {
    const { clear, edit } = req.query;
    if (clear) {
      delete req.session.form[req.model.id];
      return cancelEdit(req, res, next);
    }
    if (edit) {
      return editAnswers(req, res, next);
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
    Object.assign(res.locals.static, { values: req.form.values });
    return locals(req, res, next);
  };

  const submit = (req, res, next) => {
    if (req.session.form && req.session.form[req.model.id]) {
      return submitChange(req, res, next);
    }
    return res.redirect(req.originalUrl);
  };

  app.get('/',
    _configure,
    _processQuery,
    _checkSession,
    _getValues,
    _locals
  );

  app.post('/',
    _configure,
    submit
  );

  return app;
};
