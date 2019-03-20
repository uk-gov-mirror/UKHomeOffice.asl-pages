const dictionary = require('@asl/dictionary');

const roles = [
  'nacwo',
  'nio',
  'nvs',
  'ntco',
  'nprc'
];

module.exports = roles.reduce((map, role) => {
  return {
    ...map,
    [role]: `${dictionary[role.toUpperCase()]} (${role.toUpperCase()})`
  };
}, {
  pelh: 'Establishment Licence Holder'
});
