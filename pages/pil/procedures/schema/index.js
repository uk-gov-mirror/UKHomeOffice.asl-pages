const { procedureCodes } = require('@asl/constants');
const { procedureDefinitions } = require('../../../../constants');
const { toArray } = require('../../../../lib/utils');

const procedureOptions = procedureCodes.map(code => (
  {
    label: code + '. ' + procedureDefinitions[code],
    value: code,
    reveal: code === 'D' || code === 'F'
      ? { notes: { inputType: 'textarea' } }
      : null
  }
));

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
