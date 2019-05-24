const namedRoles = require('../../../profile/roles/content/named-roles');

module.exports = {
  namedRoles,
  'sticky-nav': {
    establishment: 'Establishment details',
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
