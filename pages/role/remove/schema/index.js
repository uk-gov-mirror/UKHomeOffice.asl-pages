const namedRoles = require('../../content/named-roles');

module.exports = roles => {
  const options = roles.map(role => {
    return {
      value: role,
      label: namedRoles[role]
    };
  });

  return {
    type: {
      inputType: 'radioGroup',
      validate: [
        'required',
        {
          definedValues: roles
        }
      ],
      options,
      nullValue: []
    },
    comment: {
      inputType: 'textarea'
    }
  };
};
