// eslint-disable-next-line no-warning-comments
//TODO: Remove this file once named person mvp flag is removed
// https://collaboration.homeoffice.gov.uk/jira/browse/ASL-4716
const dictionary = require('@ukhomeoffice/asl-dictionary');

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
