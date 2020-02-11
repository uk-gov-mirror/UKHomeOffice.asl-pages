module.exports = {
  title: 'Convert existing project',
  fields: {
    licenceNumber: {
      label: 'Licence number'
    },
    issueDate: {
      label: 'Granted date'
    }
  },
  errors: {
    licenceNumber: {
      required: 'Enter the licence number.'
    },
    issueDate: {
      required: 'Enter the granted date.',
      validDate: 'Enter a valid date.',
      dateIsBefore: 'Granted date cannot be in the future.'
    }
  }
};
