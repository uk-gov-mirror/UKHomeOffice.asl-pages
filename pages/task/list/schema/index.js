module.exports = {
  updatedAt: {
    show: true
  },
  establishment: {
    show: true,
    sortable: false,
    accessor: 'data.establishment.name'
  },
  type: {
    show: true,
    sortable: false,
    accessor: 'data.action'
  },
  status: {
    show: true,
    sortable: false
  },
  activeDeadline: {
    show: true,
    sortable: true
  },
  assignedTo: {
    show: true,
    sortable: false
  }
};
