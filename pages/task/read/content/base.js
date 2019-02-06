const status = require('../../content/status');

module.exports = {
  title: 'Review application',
  status,
  currentStatus: 'Current status',
  fields: {
    status: {
      label: 'What is your decision?'
    },
    comment: {
      label: 'Comments'
    }
  },
  'sticky-nav': {
    comments: 'Comments',
    status: 'Make decision'
  },
  task: {
    submittedBy: 'Submitted by',
    submittedOn: 'on {{date}}.',
    applicantName: 'Applicant name'
  },
  errors: {
    status: {
      required: 'Please approve or reject this task',
      definedOptions: 'Please select an option from the list'
    },
    comment: {
      customValidate: 'Please provide a reason'
    }
  }
};
