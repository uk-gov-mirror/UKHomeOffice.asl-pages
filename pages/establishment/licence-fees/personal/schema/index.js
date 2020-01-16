module.exports = req => ({
  licenceHolder: {
    show: true,
    sort: 'profile.lastName'
  },
  licenceNumber: {
    show: true
  },
  startDate: {
    show: true,
    sortable: false
  },
  endDate: {
    show: true,
    sortable: false
  },
  waived: {
    show: req.user.profile.asruUser
  }
});
