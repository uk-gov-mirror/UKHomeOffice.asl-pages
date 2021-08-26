module.exports = {
  id: {},
  title: {
    show: true,
    title: 'Project title'
  },
  licenceHolder: {
    show: true,
    sort: 'licenceHolder.lastName',
    title: 'PPL holder',
    toCSVString: licenceHolder => `${licenceHolder.firstName} ${licenceHolder.lastName}`
  },
  ropsDeadline: {
    show: true,
    title: 'Deadline for submission'
  },
  ropsSubmittedDate: {
    show: true,
    title: 'Date submitted'
  },
  ropsStatus: {
    show: true,
    title: 'Status',
    sortable: false
  }
};
