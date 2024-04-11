const { Router } = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const { generateSecret, checkSecret } = require('../../../lib/middleware/csrf');
const {
  mapValues,
  mapKeys,
  map,
  size,
  get,
  isEmpty,
  isUndefined,
  identity,
  pickBy,
  pick,
  omit,
  omitBy,
  chain,
  reduce,
  castArray,
  cloneDeep
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

function setValuesToSession(req) {
  const schema = {
    ...flattenDetailsReveals(req.form.schema),
    ...flattenFieldsets(req.form.schema),
    ...flattenFieldsets(getOptionReveals(req.form.schema, req.body))
  };

  const values = omitBy(
    req.form.values,
    (val, key) => schema[key] && schema[key].meta
  );
  const meta = pickBy(
    req.form.values,
    (val, key) => schema[key] && schema[key].meta
  );

  Object.assign(req.session.form[req.model.id].values, values);
  Object.assign(req.session.form[req.model.id].meta, meta);
}

const getOptionReveals = (schema, values) => {
  function getValue(valueKey, key) {
    const value = values[valueKey];
    const opts = schema[key];
    return opts.format ? opts.format(value) : value;
  }

  return Object.keys(schema).reduce((obj, key) => {
    const field = schema[key];
    if (!field.options) {
      return obj;
    }
    const valueKey = field.prefix ? `${field.prefix}-${key}` : key;
    const selectedOptions = field.options.filter((opt) => {
      if (!values) {
        return true;
      }
      const value = typeof opt === 'string' ? opt : opt.value;
      return castArray(getValue(valueKey, key)).includes(value);
    });
    return selectedOptions.reduce((o, opt) => {
      return {
        ...o,
        ...mapKeys(opt.reveal || {}, (v, k) => {
          return v.prefix ? `${v.prefix}-${k}` : k;
        }),
        ...getOptionReveals(opt.reveal || {}, values)
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
  const keys = Object.keys(schema).filter(
    (key) => !Object.keys(data).includes(key)
  );
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

const getConditionalRevealKeys = (schema) =>
  chain(schema)
    .filter((field) => field.inputType === 'conditionalReveal')
    .map((field) => Object.keys(field.reveal))
    .flatten()
    .value();

const flattenDetailsReveals = (schema) => {
  // if we don't clone the schema here it gets modified in place because object refs...
  schema = cloneDeep(schema);

  return reduce(
    schema,
    (flattenedSchema, field, key) => {
      if (field.options) {
        field.options = map(field.options, (option) => {
          return option.options || option.reveal
            ? flattenDetailsReveals({ option }).option
            : option;
        });
      }

      if (field.reveal) {
        field.reveal = reduce(
          field.reveal,
          (fields, revealedField, revealedKey) => {
            // if the field is a details reveal, remove it and copy the revealed fields to the parent object
            if (revealedField.inputType === 'detailsReveal') {
              return {
                ...fields,
                ...revealedField.reveal
              };
            }
            return {
              ...fields,
              [revealedKey]: revealedField
            };
          },
          {}
        );
      }

      flattenedSchema[key] = field;

      return flattenedSchema;
    },
    {}
  );
};

const flattenFieldsets = (schema) => {
  // if we don't clone the schema here it gets modified in place because object refs...
  schema = cloneDeep(schema);

  return reduce(
    schema,
    (flattenedSchema, field, key) => {
      if (field.fields) {
        return {
          ...flattenedSchema,
          ...field.fields
        };
      } else {
        return {
          ...flattenedSchema,
          [key]: field
        };
      }
    },
    {}
  );
};

const schemaWithReveals = (schema) =>
  reduce(
    schema,
    (obj, value, key) => {
      return {
        ...obj,
        [key]: value,
        ...(value.reveal || {}),
        ...(value.options || []).reduce(
          (acc, opt) => ({
            ...acc,
            ...(opt.reveal ? schemaWithReveals(opt.reveal) : {})
          }),
          {}
        )
      };
    },
    {}
  );

const filterFieldProps = (schema) =>
  reduce(
    schema,
    (obj, value, key) => {
      return {
        ...obj,
        [key]: omit(value, ['checkChanged', 'showDiff'])
      };
    },
    {}
  );

const trim = (value) => {
  if (typeof value === 'string') {
    // split input into lines, trim each one, and then rejoin
    return value
      .split('\n')
      .map((s) => s.trim())
      .join('\n')
      .trim();
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
  requiresDeclaration = () => false,
  cancelEdit = (req, res) => {
    return res.redirect(cancelPath);
  },
  editAnswers = (req, res) => {
    return res.redirect(req.baseUrl.replace(/\/confirm/, ''));
  },
  settings = {}
} = {}) => {
  const form = Router();

  const _configure = (req, res, next) => {
    req.form = req.form || {};
    req.form.schema = cloneDeep(schema);
    req.session.form = req.session.form || {};
    req.session.form[req.model.id] = req.session.form[req.model.id] || {};
    req.session.form[req.model.id].values =
      req.session.form[req.model.id].values || {};
    req.session.form[req.model.id].meta =
      req.session.form[req.model.id].meta || {};
    if (requiresDeclaration(req)) {
      req.form.schema.declaration = {
        inputType: 'declaration',
        validate: 'required'
      };
    }
    return configure(req, res, next);
  };

  const _parse = (req, res, next) => {
    const contentType = req.get('content-type');
    if (contentType && contentType.match(/multipart\/form-data/)) {
      const storage = multer.memoryStorage();
      const options = map(
        pickBy(req.form.schema, (field) => field.inputType === 'inputFile'),
        (value, name) => {
          return {
            name,
            maxCount: value.maxCount || 1
          };
        }
      );
      return multer({ storage }).fields(options)(req, res, next);
    }

    return bodyParser.urlencoded({ extended: false, limit: settings?.bodySizeLimit })(req, res, next);
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
    const schema = {
      ...flattenDetailsReveals(req.form.schema),
      ...flattenFieldsets(req.form.schema),
      ...getOptionReveals(req.form.schema, req.body)
    };

    req.form.values = cleanModel(pickValues(req.model, schema));
    if (!isEmpty(req.session.form[req.model.id].values)) {
      Object.assign(
        req.form.values,
        cleanModel(pickValues(req.session.form[req.model.id].values, schema))
      );
    }
    if (!isEmpty(req.session.form[req.model.id].meta)) {
      Object.assign(
        req.form.values,
        cleanModel(pickValues(req.session.form[req.model.id].meta, schema))
      );
    }

    return getValues(req, res, next);
  };

  const _process = (req, res, next) => {
    req.form.schema = flattenFieldsets(flattenDetailsReveals(req.form.schema));

    const reveals = flattenFieldsets(
      getOptionReveals(req.form.schema, req.body)
    );
    const conditionalRevealKeys = getConditionalRevealKeys(req.form.schema);

    const schema = {
      ...req.form.schema,
      ...reveals
    };

    req.form.values = pick(req.body, [
      ...Object.keys(req.form.schema),
      ...Object.keys(reveals),
      ...conditionalRevealKeys
    ]);

    req.form.values = mapValues(req.form.values, (value, key) => {
      const nullValue = schema[key].nullValue;
      return value || isUndefined(nullValue) ? value : nullValue;
    });
    req.form.values = mapValues(req.form.values, (value, key) => {
      const format = schema[key].format || identity;
      return format(value, req.form.values);
    });
    req.form.values = mapValues(req.form.values, trim);
    req.form.values = cleanModel(req.form.values);

    return process(req, res, next);
  };

  const _checkChanged = (req, res, next) => {
    if (!checkChanged) {
      return next();
    }

    const changedFields = pickBy(
      schemaWithReveals(req.form.schema),
      (field, key) => {
        return (
          field.checkChanged !== false &&
          hasChanged(req.form.values[key], req.model[key], field)
        );
      }
    );

    if (size(changedFields)) {
      return next();
    }

    return next({ validation: { form: 'unchanged' } });
  };

  const _validate = (req, res, next) => {
    const schema = reduce(
      req.form.schema,
      (obj, value, key) => {
        if (
          value.inputType === 'conditionalReveal' &&
          req.form.values[key] === 'true'
        ) {
          return {
            ...obj,
            ...value.reveal
          };
        }
        return {
          ...obj,
          [key]: value
        };
      },
      {}
    );

    const reveals = flattenFieldsets(
      getOptionReveals(req.form.schema, req.form.values)
    );

    const fileKeys = Object.keys(schema).filter(
      (k) => schema[k].inputType === 'inputFile'
    );
    const validation = {
      ...validator(
        req.form.values,
        omit({ ...schema, ...reveals }, fileKeys),
        req.model
      ),
      ...validator(req.files, pick(schema, fileKeys), req.model)
    };
    if (size(validation)) {
      return next({ validation });
    }
    return validate(req, res, next);
  };

  const _saveValues = (req, res, next) => {
    const conditionalReveals = pickBy(req.form.schema, (field) => {
      return field.inputType === 'conditionalReveal';
    });

    setValuesToSession(req);

    Object.keys(conditionalReveals).forEach((key) => {
      if (req.form.values[key] !== 'true') {
        Object.keys(conditionalReveals[key].reveal).forEach((revealKey) => {
          const reveal = conditionalReveals[key].reveal[revealKey];
          // remove value if parent conditional reveal is not 'true'
          req.session.form[req.model.id].values[revealKey] =
            reveal.nullValue || null;
        });
      }
      // remove pseudo fields
      delete req.session.form[req.model.id].values[key];
    });

    return saveValues(req, res, next);
  };

  const _getValidationErrors = (req, res, next) => {
    const fields = Object.keys(schemaWithReveals(req.form.schema));
    const reveals = Object.keys(
      flattenFieldsets(getOptionReveals(req.form.schema))
    );
    req.form.validationErrors = pick(
      req.session.form[req.model.id].validationErrors,
      [...fields, ...reveals, 'form']
    );
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
      setValuesToSession(req);

      return res.redirect(req.originalUrl);
    }
    return next(err);
  };

  form.get(
    '/',
    checkSession,
    _configure,
    _generateSecret,
    _processQuery,
    _getValues,
    _getValidationErrors,
    _locals
  );

  form.post(
    '/',
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

module.exports.getOptionReveals = getOptionReveals;
