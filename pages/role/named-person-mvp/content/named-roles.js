const listOfRoles = require('../../content/named-roles');

// eslint-disable-next-line no-warning-comments
//TODO: There is another file with same name named-roles.js. When named person flag is removed, both files should be combined to give the final list of roles
// 'pelh' role should removed from the list of roles as it is not required for named person
// https://collaboration.homeoffice.gov.uk/jira/browse/ASL-4716
module.exports = Object.entries(listOfRoles).reduce((acc, [key, value]) => {
  if (key !== 'pelh') {
    acc[key] = value;
  }
  return acc;
}, {});
