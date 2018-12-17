module.exports = {
  task: {
    submittedBy: 'Submitted by',
    submittedOn: 'on {{date}}.',
    applicantName: 'Applicant name',
    confirm: require('./confirm')
  },
  pil: require('./pil'),
  errors: {
    decision: {
      required: 'Please approve or reject this task',
      definedOptions: 'Please select an option from the list'
    },
    reason: {
      customValidate: 'Please provide a reason'
    }
  }
};
