const { isEqual } = require('lodash');
const { toArray } = require('../../../lib/utils');
const content = require('../update/content/confirm');

const options = [
  {
    label: content.declarations.declaration1,
    value: 'declaration-1'
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
        console.log(optionValues, model.declarations); // << doesn't get called

        return isEqual(optionValues, model.declarations);
      }
    }]
  }
};
