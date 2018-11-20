module.exports = {
  updatedAt: {
    show: true
  },
  establishment: {
    show: true,
    sortable: false
  },
  licence: {
    show: true,
    sortable: false
  },
  type: {
    show: true,
    sortable: false,
    accessor: 'action.label'
  }
};
