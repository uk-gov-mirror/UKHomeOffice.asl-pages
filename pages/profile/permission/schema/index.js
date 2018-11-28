const PERMISSION_LEVELS = ['admin', 'read', 'basic'];

module.exports = {
  permission: {
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
