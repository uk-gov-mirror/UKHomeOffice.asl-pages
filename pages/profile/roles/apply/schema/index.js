const namedRoles = require('../../content/named-roles');

const NAMED_ROLES = [
  'nacwo',
  'nio',
  'ntco',
  'nvs'
];

module.exports = roles => {
  roles = NAMED_ROLES.filter(r => !roles.includes(r));

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
