const { toBoolean } = require('../../../../lib/utils');

module.exports = {
  update: {
    inputType: 'radioGroup',
    format: toBoolean,
    options: [
      {
        label: 'Yes, I need to update it',
        value: true
      },
      {
        label: 'No, that looks fine',
        value: false
      }
    ],
    validate: ['required']
  }
};
