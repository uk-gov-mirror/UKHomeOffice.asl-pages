const { moduleCodes } = require('@asl/constants');
const { toArray } = require('../../../../lib/utils');
const content = require('../content/modules');
const { normalise } = require('../../../../lib/utils');

const options = moduleCodes.map(module => {
  return {
    label: module,
    value: module,
    reveal: {
      [`module-${normalise(module)}-reason`]: {
        inputType: 'textarea',
        validate: 'required',
        label: content.fields.reason.label
      }
    }
  };
});

module.exports = {
  modules: {
    inputType: 'checkboxGroup',
    options,
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
