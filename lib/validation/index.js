const { reduce } = require('lodash');
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

const validateField = ({ value, validate }) => {
  return validate.reduce((err, options) => {
    const { validator, params } = options;
    return err || (!validators[validator](value, params) && validator);
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
