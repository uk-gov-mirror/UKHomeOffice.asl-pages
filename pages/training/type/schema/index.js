const { toBoolean } = require('../../../../lib/utils');

module.exports = {
  isExemption: {
    inputType: 'radioGroup',
    format: toBoolean,
    options: [
      {
        label: 'Add a training certificate',
        value: false
      },
      {
        label: 'Ask for an exemption',
        value: true,
        hint: 'This could be because you have equivalent training or professional experience which makes the training unnecessary.'
      }
    ],
    validate: [
      'required'
    ]
  }
};
