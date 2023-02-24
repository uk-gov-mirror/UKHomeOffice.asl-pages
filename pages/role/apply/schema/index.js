const namedRoles = require('../../content/named-roles');
const hintText = require('../../content/hint-text');

const excludedRoles = {
  corporate: ['pelh'],
  'non-profit': ['nprc']
};

module.exports = (roles, establishment) => {
  const excludeRoles = (establishment.corporateStatus && excludedRoles[establishment.corporateStatus]) || [];
  roles = Object.keys(namedRoles)
    .filter(r => !roles.includes(r))
    .filter(r => !excludeRoles.includes(r));

  const options = roles.map(role => {
    return {
      value: role,
      label: namedRoles[role],
      hint: hintText[role],
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
