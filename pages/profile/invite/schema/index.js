const PERMISSION_LEVELS = ['admin', 'read', 'basic'];

module.exports = {
  firstName: {
    inputType: 'inputText',
    validate: [
      'required'
    ]
  },
  lastName: {
    inputType: 'inputText',
    validate: [
      'required'
    ]
  },
  email: {
    inputType: 'inputEmail',
    validate: [
      'required',
      'email'
    ]
  },
  role: {
    inputType: 'radioGroup',
    validate: [
      'required',
      {
        definedValues: PERMISSION_LEVELS
      }
    ],
    options: PERMISSION_LEVELS
  }
};
