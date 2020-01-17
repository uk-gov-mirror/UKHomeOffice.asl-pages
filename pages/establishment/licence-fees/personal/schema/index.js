module.exports = req => {
  const schema = {
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
    }
  };
  if (req.user.profile.asruUser) {
    schema.waived = {
      show: true
    };
  }
  return schema;
};
