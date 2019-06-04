const namedRoles = require('../../../profile/roles/content/named-roles');

module.exports = {
  namedRoles,
  'sticky-nav': {
    applicant: 'Applicant',
    role: 'Named role details'
  },
  fields: {
    role: {
      label: 'Role'
    },
    rcvsNumber: {
      label: 'RCVS number'
    }
  }
};
