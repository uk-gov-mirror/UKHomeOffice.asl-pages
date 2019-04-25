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
    activity: 'Latest activity',
    comments: 'Comments',
    status: 'Next steps',
    withdraw: 'Withdraw application'
  },
  activityLog: {
    open: 'Show previous activity',
    close: 'Hide previous activity'
  },
  'make-decision': {
    hint: ''
  },
  task: {
    submittedBy: 'Submitted by',
    submittedOn: 'on {{date}}.',
    applicantName: 'Applicant name',
    withdrawTitle: 'Withdraw application',
    withdrawHint: 'You will need to create a new application if you want to apply for this type of licence in future.',
    withdrawAction: 'Withdraw application'
  },
  errors: {
    status: {
      required: 'Please approve or reject this task',
      definedValues: 'Please select an option from the list'
    },
    comment: {
      customValidate: 'Please provide a reason'
    }
  }
};
