const { castArray } = require('lodash');
const { procedureCodes } = require('@asl/constants');
const procedureDefinitions = require('../content/procedure-definitions');

const procedureOptions = procedureCodes.map(code => (
  {
    label: code + '. ' + procedureDefinitions[code],
    value: code
  }
));

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
        definedValues: procedureCodes
      }
    ]
  }
};
