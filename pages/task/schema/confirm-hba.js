const content = require('../read/content/confirm-hba');
const { get } = require('lodash');

const options = ['yes', 'no'].map((value) => {
  return {
    value,
    label: get(content, `fields.confirmHba.options.${value}`)
  };
});

module.exports = {
  confirmHba: {
    inputType: 'radioGroup',
    options,
    nullValue: [],
    validate: [
      'required',
      {
        definedValues: options.map((option) => option.value)
      }
    ]
  }
};
