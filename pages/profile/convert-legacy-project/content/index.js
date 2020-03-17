module.exports = {
  title: 'Convert existing licence',
  description: 'Convert an existing project licence to a digital version that can be managed in ASPeL.',
  fields: {
    title: {
      label: 'Project title'
    },
    licenceNumber: {
      label: 'Licence number'
    },
    issueDate: {
      label: 'Granted date'
    },
    duration: {
      label: 'Licence duration'
    },
    years: {
      label: 'Years'
    },
    months: {
      label: 'Months'
    }
  },
  errors: {
    title: {
      required: 'Enter the name of the project'
    },
    licenceNumber: {
      required: 'Enter the licence number'
    },
    issueDate: {
      required: 'Enter the granted date',
      validDate: 'Enter a valid date',
      dateIsBefore: 'Granted date cannot be in the future'
    },
    duration: {
      required: 'Enter the duration of the licence'
    }
  },
  buttons: {
    submit: 'Continue',
    cancel: 'Cancel'
  }
};
