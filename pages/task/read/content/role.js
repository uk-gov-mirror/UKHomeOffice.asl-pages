const namedRoles = require('../../../role/content/named-roles');

module.exports = {
  namedRoles,
  'sticky-nav': {
    applicant: 'Applicant',
    role: 'Amendment details'
  },
  fields: {
    role: {
      label: 'Role'
    },
    rcvsNumber: {
      label: 'RCVS number'
    }
  },
  action: {
    assigned: 'Assigned to',
    removed: 'Removed from'
  },
  remaining: {
    some: 'Remaining users with this role',
    none: 'There are no other users currently holding this role'
  }
};
