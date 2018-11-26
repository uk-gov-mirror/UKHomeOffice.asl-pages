module.exports = {
  updatedAt: {
    show: true
  },
  establishment: {
    show: true,
    sortable: false,
    accessor: 'data.establishment.name'
  },
  licence: {
    show: true,
    sortable: false,
    accessor: 'data.model'
  },
  type: {
    show: true,
    sortable: false,
    accessor: 'data.action'
  }
};
