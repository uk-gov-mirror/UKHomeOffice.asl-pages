const { procedureCodes } = require('@ukhomeoffice/asl-constants');
const { procedureDefinitions } = require('../../content');
const { toArray } = require('../../../../lib/utils');

const procedureOptions = procedureCodes.map(code => (
  {
    label: code + '. ' + procedureDefinitions[code],
    value: code,
    reveal: code === 'D' || code === 'F'
      ? {
        [`notesCat${code}`]: {
          inputType: 'textarea',
          validate: ['required']
        }
      }
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
