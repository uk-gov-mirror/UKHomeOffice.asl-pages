const namedRoles = require('../../content/named-roles');

module.exports = roles => {
  const options = roles.map(role => {
    return {
      value: role.type,
      label: namedRoles[role.type]
    };
  });

  return {
    type: {
      inputType: 'radioGroup',
      validate: [
        'required',
        {
          definedValues: roles.map(r => r.type)
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
