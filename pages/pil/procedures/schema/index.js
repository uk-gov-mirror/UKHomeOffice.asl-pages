const { castArray } = require('lodash');
const { procedureCodes } = require('../../../../constants');

const toArray = val => {
  if (!val) {
    return [];
  }
  return castArray(val);
};

module.exports = {
  procedures: {
    inputType: 'checkboxGroup',
    options: procedureCodes,
    format: toArray,
    nullValue: [],
    validate: [
      'required',
      {
        definedValues: procedureCodes
      }
    ]
  }
};
