module.exports = {
  id: {
    filter: false
  },
  name: {
    show: true,
    filter: false,
    sort: 'lastName'
  },
  firstName: {},
  lastName: {},
  roles: {
    show: true,
    exact: true,
    sortable: false,
    accessor: 'roles.type',
    f: 'type'
  },
  pilLicenceNumber: {
    show: true
  }
};
