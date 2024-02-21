const { chain, unionWith, isEqual, reduce, mapValues, castArray } = require('lodash');
const validators = require('./validators');

const defaultValidators = [
  {
    inputType: 'inputText',
    validate: [
      {
        validator: 'maxLength',
        params: 256
      }
    ]
  }
];

const validateField = (key, { value, validate = [] }, fields, model) => {
  return validate.reduce((err, options) => {
    const { validator, params } = options;
    return err || (!validators[validator](key, value, params, fields, model) && validator);
  }, null);
};

const validate = (fields, model) => {
  return reduce(fields, (err, field, key) => {
    const type = validateField(key, field, mapValues(fields, f => f.value), model);
    if (type) {
      return { ...err, [key]: type };
    }
    return err;
  }, {});
};

const normaliseValidators = field => {
  if (!field.validate) {
    field.validate = [];
    return field;
  }
  return {
    ...field,
    validate: castArray(field.validate).map(v => {
      if (typeof v === 'string') {
        return { validator: v };
      }
      if (v.validator) {
        return v;
      }
      const validator = Object.keys(v)[0];
      return {
        validator,
        params: v[validator]
      };
    })
  };
};

const mapDefaults = (field) => {
  const defaults = (defaultValidators.find(v => v.inputType === field.inputType) || {}).validate;
  return {
    ...field,
    validate: field.validate
      ? unionWith(field.validate, defaults, isEqual)
      : defaults
  };
};

const middleware = (values, schema, model) => {
  const validators = chain(schema)
    .mapValues((field, key) => ({ ...field, value: values[key] }))
    .mapValues(normaliseValidators)
    .mapValues(mapDefaults)
    .pickBy((field, key) => {
      if (!field.conditionalReveal) {
        return true;
      }
      return values[`conditional-reveal-${key}`] === 'true';
    })
    .value();

  return validate(validators, model);
};

middleware.validate = validate;
module.exports = middleware;
