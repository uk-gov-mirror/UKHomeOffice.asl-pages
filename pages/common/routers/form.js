const { Router } = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const { generateSecret, checkSecret } = require('../../../lib/middleware/csrf');
const {
  mapValues,
  map,
  size,
  get,
  isEmpty,
  isUndefined,
  identity,
  pickBy,
  pick,
  omit,
  chain,
  reduce,
  castArray
} = require('lodash');
const validator = require('../../../lib/validation');
const { hasChanged, cleanModel } = require('../../../lib/utils');

const defaultMiddleware = (req, res, next) => next();

let _generateSecret = generateSecret;
let _checkSecret = checkSecret;
if (process.env.CSRF === 'false') {
  _generateSecret = defaultMiddleware;
  _checkSecret = defaultMiddleware;
}

const getOptionReveals = (schema, values) => {
  return Object.keys(schema).reduce((obj, key) => {
    const field = schema[key];
    if (!field.options) {
      return obj;
    }
    const selectedOptions = field.options.filter(opt => {
      if (!values) {
        return true;
      }
      return castArray(values[key]).includes(opt.value);
    });
    return selectedOptions.reduce((o, opt) => {
      return {
        ...o,
        ...(opt.reveal || {})
      };
    }, obj);
  }, {});
};

const getFormValues = (data, schema) => {
  return mapValues(data, (value, key) => {
    const accessor = get(schema, `${key}.accessor`);
    if (typeof accessor === 'function') {
      return accessor(data);
    }
    return get(value, accessor, value);
  });
};

const getPseudoFields = (data, schema) => {
  const keys = Object.keys(schema).filter(key => !Object.keys(data).includes(key));
  return keys.reduce((obj, key) => {
    const options = schema[key];
    if (!options.getValue) {
      return obj;
    }

    return {
      ...obj,
      [key]: options.getValue(data)
    };
  }, {});
};

const pickValues = (values, schema) => {
  return {
    ...getFormValues(values, schema),
    ...getPseudoFields(values, schema)
  };
};

const getConditionalRevealKeys = schema => chain(schema)
  .filter(field => field.inputType === 'conditionalReveal')
  .map(field => Object.keys(field.reveal))
  .flatten()
  .value();

const schemaWithReveals = schema => reduce(schema, (obj, value, key) => {
  return {
    ...obj,
    [key]: value,
    ...(value.reveal || {})
  };
}, {});

const filterFieldProps = schema => reduce(schema, (obj, value, key) => {
  return {
    ...obj,
    [key]: omit(value, ['checkChanged', 'showDiff'])
  };
}, {});

const trim = value => {
  if (typeof value === 'string') {
    // split input into lines, trim each one, and then rejoin
    return value.split('\n').map(s => s.trim()).join('\n').trim();
  } else if (Array.isArray(value)) {
    return value.map(trim);
  }
  return value;
};

module.exports = ({
  schema = {},
  cancelPath = '/',
  checkChanged = false,
  checkSession = defaultMiddleware,
  configure = defaultMiddleware,
  getValues = defaultMiddleware,
  getValidationErrors = defaultMiddleware,
  locals = defaultMiddleware,
  process = defaultMiddleware,
  validate = defaultMiddleware,
  saveValues = defaultMiddleware,
  requiresDeclaration = req => false,
  cancelEdit = (req, res, next) => {
    return res.redirect(cancelPath);
  },
  editAnswers = (req, res, next) => {
    return res.redirect(req.baseUrl.replace(/\/confirm/, ''));
  }
} = {}) => {
  const form = Router();

  const _configure = (req, res, next) => {
    console.log("IN FORM ROUTER:CONFIGURE");

    req.form = req.form || {};
    req.form.schema = schema;
    req.session.form = req.session.form || {};
    req.session.form[req.model.id] = req.session.form[req.model.id] || {};
    req.session.form[req.model.id].values = req.session.form[req.model.id].values || {};
    if (requiresDeclaration(req)) {
      req.form.schema.declaration = {
        inputType: 'declaration',
        validate: 'required'
      };
    }

    console.log('schema', req.form.schema);

    return configure(req, res, next);
  };

  const _parse = (req, res, next) => {
    const contentType = req.get('content-type');
    if (contentType && contentType.match(/multipart\/form-data/)) {
      const storage = multer.memoryStorage();
      const options = map(pickBy(req.form.schema, field => field.inputType === 'inputFile'), (value, name) => {
        return {
          name,
          maxCount: value.maxCount || 1
        };
      });
      return multer({ storage }).fields(options)(req, res, next);
    }
    return bodyParser.urlencoded({ extended: false })(req, res, next);
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
    return next();
  };

  const _clearErrors = (req, res, next) => {
    delete req.session.form[req.model.id].validationErrors;
    next();
  };

  const _getValues = (req, res, next) => {
    req.form.values = cleanModel(pickValues(req.model, req.form.schema));
    if (!isEmpty(req.session.form[req.model.id].values)) {
      Object.assign(req.form.values, cleanModel(pickValues(req.session.form[req.model.id].values, req.form.schema)));
    }
    return getValues(req, res, next);
  };

  const _process = (req, res, next) => {
    req.form.values = pick(req.body, Object.keys(req.form.schema));
    req.form.values = mapValues(req.form.values, (value, key) => {
      const nullValue = req.form.schema[key].nullValue;
      return (value || isUndefined(nullValue)) ? value : nullValue;
    });
    req.form.values = mapValues(req.form.values, (value, key) => {
      const format = req.form.schema[key].format || identity;
      return format(value, req.form.values);
    });
    req.form.values = mapValues(req.form.values, trim);
    req.form.values = cleanModel(req.form.values);

    const conditionalRevealKeys = getConditionalRevealKeys(req.form.schema);
    const revealKeys = Object.keys(getOptionReveals(req.form.schema, req.body));
    Object.assign(req.form.values, {
      ...pick(req.body, [
        ...conditionalRevealKeys,
        ...revealKeys
      ])
    });
    return process(req, res, next);
  };

  const _checkChanged = (req, res, next) => {
    if (!checkChanged) {
      return next();
    }

    const changedFields = pickBy(schemaWithReveals(req.form.schema), (field, key) => {
      return field.checkChanged !== false &&
        hasChanged(req.form.values[key], req.model[key], field);
    });

    if (size(changedFields)) {
      return next();
    }

    return next({ validation: { form: 'unchanged' } });
  };

  const _validate = (req, res, next) => {
    const schema = reduce(req.form.schema, (obj, value, key) => {
      if (value.inputType === 'conditionalReveal' && req.form.values[key] === 'true') {
        return {
          ...obj,
          ...value.reveal
        };
      }
      return {
        ...obj,
        [key]: value
      };
    }, {});

    const reveals = getOptionReveals(req.form.schema, req.form.values);

    const fileKeys = Object.keys(schema).filter(k => schema[k].inputType === 'inputFile');
    const validation = {
      ...validator(req.form.values, omit({ ...schema, ...reveals }, fileKeys), req.model),
      ...validator(req.files, pick(schema, fileKeys), req.model)
    };
    if (size(validation)) {
      return next({ validation });
    }
    return validate(req, res, next);
  };

  const _saveValues = (req, res, next) => {
    const conditionalReveals = pickBy(req.form.schema, field => {
      return field.inputType === 'conditionalReveal';
    });

    Object.assign(req.session.form[req.model.id].values, req.form.values);

    Object.keys(conditionalReveals).forEach(key => {
      if (req.form.values[key] !== 'true') {
        Object.keys(conditionalReveals[key].reveal).forEach(revealKey => {
          const reveal = conditionalReveals[key].reveal[revealKey];
          // remove value if parent conditional reveal is not 'true'
          req.session.form[req.model.id].values[revealKey] = reveal.nullValue || null;
        });
      }
      // remove pseudo fields
      delete req.session.form[req.model.id].values[key];
    });

    return saveValues(req, res, next);
  };

  const _getValidationErrors = (req, res, next) => {
    const fields = Object.keys(schemaWithReveals(req.form.schema));
    const reveals = Object.keys(getOptionReveals(req.form.schema));
    req.form.validationErrors = pick(req.session.form[req.model.id].validationErrors, [ ...fields, ...reveals, 'form' ]);
    return getValidationErrors(req, res, next);
  };

  const _locals = (req, res, next) => {
    const { values, validationErrors, schema } = req.form;
    Object.assign(res.locals.static, {
      schema: filterFieldProps(schema),
      errors: validationErrors,
      csrfToken: req.csrfToken
    });
    Object.assign(res.locals, { model: values });
    return locals(req, res, next);
  };

  const errorHandler = (err, req, res, next) => {
    if (err.validation) {
      req.session.form[req.model.id].validationErrors = err.validation;
      Object.assign(req.session.form[req.model.id].values, req.form.values);
      return res.redirect(req.originalUrl);
    }
    return next(err);
  };

  form.get('/',
    checkSession,
    _configure,
    _generateSecret,
    _processQuery,
    _getValues,
    _getValidationErrors,
    _locals
  );

  form.post('/',
    _configure,
    _parse,
    _checkSecret,
    _clearErrors,
    _process,
    _validate,
    _checkChanged,
    _saveValues,
    errorHandler
  );

  return form;
};
