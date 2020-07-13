const namedRoles = require('../../../role/content/named-roles');

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
  },
  remaining: {
    some: 'Remaining users with this role at this establishment',
    none: 'There are no other users at this establishment currently holding this role'
  }
};
