const dictionary = require('@asl/dictionary');

const roles = [
  'nacwo',
  'nio',
  'ntco',
  'nvs',
  'sqp',
  'pelh',
  'nprc',
  'holc'
];

module.exports = roles.reduce((map, role) => {
  return {
    ...map,
    [role]: `${dictionary[role.toUpperCase()]} (${role.toUpperCase()})`
  };
}, {});
