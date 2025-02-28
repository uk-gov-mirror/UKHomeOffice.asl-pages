const dictionary = require('@ukhomeoffice/asl-dictionary');

const roles = [
  'nacwo',
  'nio',
  'ntco',
  'nvs',
  'sqp',
  'nprc',
  'holc'
];

module.exports = roles.reduce((map, role) => {
  return {
    ...map,
    [role]: `${dictionary[role.toUpperCase()]} (${role.toUpperCase()})`
  };
}, {});
