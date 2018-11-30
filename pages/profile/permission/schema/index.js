const { externalPermissions } = require('@asl/constants');

module.exports = {
  permission: {
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
