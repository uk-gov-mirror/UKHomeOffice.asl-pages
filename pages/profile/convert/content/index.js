module.exports = {
  title: 'Convert existing project',
  description: 'Add the details from the licence being converted.',
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
    submit: 'Create stub licence'
  }
};
