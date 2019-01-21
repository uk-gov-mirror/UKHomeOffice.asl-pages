const namedRoles = require('../content/named-roles');
const { difference } = require('lodash');

module.exports = (existingRoles, action) => {
  let roles = [];

  if (action === 'apply') {
    roles = difference(Object.keys(namedRoles), existingRoles);
  } else {
    roles = existingRoles;
  }

  const options = roles.map(role => {
    return {
      value: role,
      label: namedRoles[role],
      reveal: role === 'nvs' && action === 'apply'
        ? { rcvsNumber: { inputType: 'inputText' } }
        : null
    };
  });

  return {
    role: {
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
