const { moduleCodes } = require('@asl/constants');
const { toArray } = require('../../../../lib/utils');
const content = require('../content/modules');

const options = moduleCodes.map(module => {
  return {
    label: module,
    value: module,
    reveal: {
      reason: {
        inputType: 'textarea',
        validate: [{
          customValidate: (field, model) => {
            if (model.modules && model.modules.includes(module)) {
              return !!field;
            }
            return true;
          }
        }],
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
