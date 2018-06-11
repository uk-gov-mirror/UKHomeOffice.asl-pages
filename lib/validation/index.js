const { reduce } = require('lodash');
const validators = require('./validators');

const defaultValidators = [
  {
    inputType: 'inputText',
    validate: [
      {
        type: 'maxLength',
        params: 256
      }
    ]
  }
];

const validateField = ({ value, validate }) => {
  return validate.reduce((err, validator) => {
    const { type, params } = validator;
    return err || (!validators[type](value, params) && type);
  }, null);
};

const validate = fields => {
  return reduce(fields, (err, field, key) => {
    const type = validateField(field);
    if (type) {
      return { ...err, [key]: type };
    }
    return err;
  }, {});
};

validate.defaultValidators = defaultValidators;

module.exports = validate;
