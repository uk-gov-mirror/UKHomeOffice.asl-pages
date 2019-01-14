const { isEqual } = require('lodash');
const { toArray } = require('../../../../lib/utils');
const content = require('../content');

const options = [
  {
    label: content.fields.declaration.yes.label,
    value: 'yes'
  }
];

const optionValues = options.map(declaration => declaration.value);

module.exports = {
  declarations: {
    inputType: 'checkboxGroup',
    options,
    nullValue: [],
    format: toArray,
    validate: [{
      customValidate: (field, model) => {
        return isEqual(optionValues, model.declarations);
      }
    }]
  }
};
