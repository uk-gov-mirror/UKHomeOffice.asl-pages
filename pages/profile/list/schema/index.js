const { get } = require('lodash');

const namedRoles = ['pelh', 'nacwo', 'nvs', 'sqp', 'nio', 'ntco', 'nprc', 'holc'];

module.exports = {
  id: {
    filter: false,
    omitFromCSV: true
  },
  name: {
    show: true,
    filter: false,
    sort: 'lastName',
    omitFromCSV: true
  },
  firstName: {},
  lastName: {},
  email: {},
  roles: {
    show: true,
    exact: true,
    sortable: false,
    accessor: 'roles.type',
    f: 'type',
    toCSVString: (roles, row) => {
      return row.roles
        ? row.roles
          .filter(r => namedRoles.includes(r.type))
          .map(r => r.type.toUpperCase())
          .sort()
          .join(', ')
        : null;
    }
  },
  permissions: {
    show: false,
    toCSVString: (perms, row) => get(row, 'establishments[0].role')
  },
  hasLoggedIn: {
    show: false,
    toCSVString: (_, row) => row.lastLogin ? 'Yes' : 'No'
  },
  pilLicenceNumber: {
    show: true
  },
  pilStatus: {
    show: true,
    toCSVString: (_, row) => {
      if (!row.pil) {
        return '';
      }
      return (row.pil.status === 'active' && row.pil.suspendedDate) ? 'suspended' : row.pil.status;
    }
  },
  pilHoldingEstablishment: {
    show: false,
    toCSVString: (_, row) => get(row, 'pil.establishment.name')
  }
};
