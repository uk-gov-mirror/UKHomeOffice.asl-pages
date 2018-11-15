module.exports = {
  task: {
    title: 'New task',
    submittedBy: 'Submitted by',
    submittedOn: 'on {{date}}.',
    applicantName: 'Applicant name',
    confirm: require('./confirm')
  },
  pil: require('./pil'),
  fields: {
    approve: {
      label: 'Do you concur?'
    },
    notes: {
      label: 'Reason for rejection'
    }
  },
  errors: {
    approve: {
      required: 'Please approve or reject this task',
      definedOptions: 'Please select an option from the list'
    },
    notes: {
      customValidate: 'Please provide a reason'
    }
  }
};
