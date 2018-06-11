const { chain, unionWith, isEqual, size } = require('lodash');
const validate = require('../validation');
const { defaultValidators } = validate;

const normaliseValidators = field => {
  if (!field.validate) {
    return field;
  }
  return {
    ...field,
    validate: field.validate.map(v => {
      if (typeof v === 'string') {
        return { type: v };
      }
      const type = Object.keys(v)[0];
      return {
        type,
        params: v[type]
      };
    })
  };
};

const mapDefaults = (field, key) => {
  const defaults = (defaultValidators.find(v => v.inputType === field.inputType) || {}).validate;
  return {
    ...field,
    validate: field.validate
      ? unionWith(field.validate, defaults, isEqual)
      : defaults
  };
};

module.exports = () => (req, res, next) => {
  const data = req.form.data[req.place];
  if (!data) {
    return next();
  }

  const validators = chain(req.form.schema)
    .mapValues((field, key) => ({ ...field, value: data[key] }))
    .mapValues(normaliseValidators)
    .mapValues(mapDefaults)
    .pickBy(field => field.validate)
    .value();

  const validationErrors = validate(validators);
  if (size(validationErrors)) {
    next({ validation: validationErrors });
  }
  next();
};
