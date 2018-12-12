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
    },
    options: [
      {
        label: 'Yes',
        hint: 'I confirm that the applicant holds the neccessary training or experience to carry out the categories of procedures listed in this applciation',
        value: 'ntco-endorsed'
      },
      {
        label: 'No',
        value: 'returned-to-applicant'
      }]
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
