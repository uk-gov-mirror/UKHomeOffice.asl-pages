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
    accessor: 'roles.type',
    f: 'type'
  },
  pil: {
    show: true,
    accessor: 'pil.licenceNumber'
  }
};
