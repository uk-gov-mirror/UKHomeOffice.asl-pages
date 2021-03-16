const { pick } = require('lodash');
const { moduleCodes } = require('@asl/constants');
const { toArray } = require('../../../../lib/utils');

const schema = {
  exemptionReason: {
    inputType: 'textarea',
    validate: [
      'required'
    ]
  },
  modules: {
    inputType: 'checkboxGroup',
    options: moduleCodes,
    format: toArray,
    preventOptionMapping: true,
    validate: [
      'required',
      { definedValues: moduleCodes }
    ]
  }
};

module.exports = isExemption => {
  if (isExemption) {
    return pick(schema, 'exemptionReason', 'modules');
  }
  return pick(schema, 'modules');
};
