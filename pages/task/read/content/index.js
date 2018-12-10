module.exports = {
  task: {
    title: 'Review PIL Application',
    submittedBy: 'Submitted by',
    submittedOn: 'on {{date}}.',
    applicantName: 'Applicant name',
    confirm: require('./confirm')
  },
  pil: require('./pil'),
  fields: {
    decision: {
      label: 'Do you endorse this application?'
    },
    reason: {
      label: 'Reason for rejection'
    }
  },
  errors: {
    approve: {
      required: 'Please approve or reject this task',
      definedOptions: 'Please select an option from the list'
    },
    reason: {
      customValidate: 'Please provide a reason'
    }
  }
};
