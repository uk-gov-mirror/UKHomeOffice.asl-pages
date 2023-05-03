const { externalPermissions } = require('@ukhomeoffice/asl-constants');

module.exports = {
  role: {
    inputType: 'radioGroup',
    validate: [
      'required',
      {
        definedValues: externalPermissions
      }
    ],
    options: externalPermissions
  }
};
