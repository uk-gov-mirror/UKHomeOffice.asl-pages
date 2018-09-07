const { castArray } = require('lodash');
const { procedureOptions } = require('../../../../constants');

const toArray = val => {
  if (!val) {
    return [];
  }
  return castArray(val);
};

module.exports = {
  procedures: {
    inputType: 'checkboxGroup',
    options: procedureOptions,
    format: toArray,
    nullValue: [],
    validate: [
      'required',
      {
        definedValues: procedureOptions
      }
    ]
  }
};
