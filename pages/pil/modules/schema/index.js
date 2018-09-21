const { castArray } = require('lodash');
const { moduleCodes } = require('@asl/constants');

const toArray = val => {
  if (!val) {
    return [];
  }
  return castArray(val);
};

module.exports = {
  modules: {
    inputType: 'checkboxGroup',
    options: moduleCodes,
    format: toArray,
    nullValue: [],
    validate: [
      'required',
      {
        definedValues: moduleCodes
      }
    ]
  }
};
