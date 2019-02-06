const namedRoles = require('../../content/named-roles');

module.exports = roles => {
  const options = roles.map(role => {
    return {
      value: role.id,
      label: namedRoles[role.type]
    };
  });

  return {
    role: {
      inputType: 'radioGroup',
      validate: [
        'required',
        {
          definedValues: roles.map(r => r.id)
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
