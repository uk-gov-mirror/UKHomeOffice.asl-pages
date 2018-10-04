const { procedureCodes } = require('../../../../constants');
const { toArray } = require('../../../../lib/utils');

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
