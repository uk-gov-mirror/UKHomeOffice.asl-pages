const { Router } = require('express');
const bodyParser = require('body-parser');
const { mapValues, size, some, get, isEqual, merge } = require('lodash');
const validator = require('../../../lib/validation');

const defaultMiddleware = (req, res, next) => next();

const hasChanged = (value, key, item) => {
  if (Array.isArray(value)) {
    return !isEqual([ ...value ].sort(), [ ...item[key] ].sort());
  }
  return value !== item[key];
};

const flattedNested = (data, schema) =>
  mapValues(schema, ({ accessor }, key) => accessor
    ? get(data[key], accessor)
    : data[key]
  );

module.exports = ({
  schema = {},
  model = 'model',
  cancelPath = '/',
  configure = defaultMiddleware,
  clearErrors = defaultMiddleware,
  getValues = defaultMiddleware,
  process = defaultMiddleware,
  validate = defaultMiddleware,
  getValidationErrors = defaultMiddleware,
  locals = defaultMiddleware,
  saveValues = defaultMiddleware,
  cancelEdit = (req, res, next) => {
    return res.redirect(cancelPath);
  },
  editAnswers = (req, res, next) => {
    return res.redirect(req.baseUrl.replace(/\/confirm/, ''));
  }
} = {}) => {
  const form = Router();

  const _configure = (req, res, next) => {
    req.form = req.form || {};
    req.model = req.model || {};
    req.model.id = req.model.id || `new-${model}`;
    req.form.schema = schema;
    req.session.form = req.session.form || {};
    req.session.form[req.model.id] = req.session.form[req.model.id] || {};
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

  const _clearErrors = (req, res, next) => {
    delete req.session.form[req.model.id].validationErrors;
    return clearErrors(req, res, next);
  };

  const _getValues = (req, res, next) => {
    req.form.values = {
      ...flattedNested(req.model, req.form.schema),
      ...req.session.form[req.model.id].values
    };
    return getValues(req, res, next);
  };

  const _process = (req, res, next) => {
    req.form.values = mapValues(req.form.schema, ({ format }, key) => {
      return format ? format(req.body[key]) : req.body[key] || null;
    });
    return process(req, res, next);
  };

  const _checkChanged = (req, res, next) => {
    if (!size(req.form.schema) || some(req.form.values, (value, key) => hasChanged(value, key, req.model))) {
      return next();
    }
    return next({ validation: { form: 'unchanged' } });
  };

  const _validate = (req, res, next) => {
    const validation = validator(req.form.values, req.form.schema);
    if (size(validation)) {
      return next({ validation });
    }
    return validate(req, res, next);
  };

  const _saveValues = (req, res, next) => {
    merge(req.session.form[req.model.id], { values: req.form.values });
    return saveValues(req, res, next);
  };

  const _getValidationErrors = (req, res, next) => {
    req.form.validationErrors = req.session.form[req.model.id].validationErrors;
    return getValidationErrors(req, res, next);
  };

  const _locals = (req, res, next) => {
    const { values, validationErrors } = req.form;
    Object.assign(res.locals.static, { errors: validationErrors });
    Object.assign(res.locals, { model: values });
    return locals(req, res, next);
  };

  const errorHandler = (err, req, res, next) => {
    if (err.validation) {
      req.session.form[req.model.id].validationErrors = err.validation;
      merge(req.session.form[req.model.id], { values: req.form.values });
      return res.redirect(req.originalUrl);
    }
    return next(err);
  };

  form.get('/',
    _configure,
    _processQuery,
    _getValues,
    _getValidationErrors,
    _locals
  );

  form.post('/',
    bodyParser.urlencoded({ extended: false }),
    _configure,
    _clearErrors,
    _process,
    _validate,
    _checkChanged,
    _saveValues,
    errorHandler
  );

  return form;
};
