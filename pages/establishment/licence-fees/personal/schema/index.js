module.exports = req => {
  const schema = {
    licenceHolder: {
      show: true,
      sort: 'lastName',
      omitFromCSV: true
    },
    firstName: {
      show: false,
      toCSVString: (_, row) => row.profile.firstName
    },
    lastName: {
      show: false,
      toCSVString: (_, row) => row.profile.lastName
    },
    licenceNumber: {
      show: true,
      sort: 'pilLicenceNumber'
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
      show: true,
      toCSVString: waived => waived ? 'Not billable' : 'Billable'
    };
  }
  return schema;
};
