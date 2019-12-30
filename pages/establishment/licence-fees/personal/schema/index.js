module.exports = req => ({
  licenceHolder: {
    accessor: 'profile.name',
    show: true,
    sort: 'profile.lastName'
  },
  licenceNumber: {
    show: true
  },
  issueDate: {
    show: true
  },
  revocationDate: {
    show: true
  },
  billable: {
    show: req.user.profile.asruUser
  }
});
