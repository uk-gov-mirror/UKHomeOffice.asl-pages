const namedRoles = require('../../content/named-roles');

module.exports = roles => {
  roles = Object.keys(namedRoles).filter(r => !roles.includes(r));

  const options = roles.map(role => {
    return {
      value: role,
      label: namedRoles[role],
      reveal: role === 'nvs'
        ? { rcvsNumber: { inputType: 'inputText' } }
        : null
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
