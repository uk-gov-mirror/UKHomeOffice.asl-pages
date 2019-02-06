const namedRoles = require('../../../profile/roles/content/named-roles');

module.exports = {
  createTitle: 'Review named role creation',
  deleteTitle: 'Review named role removal',
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
