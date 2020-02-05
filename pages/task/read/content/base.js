const status = require('../../content/status');
const tasks = require('../../content/tasks');

module.exports = {
  status,
  tasks,
  title: 'Review {{type}}',
  currentStatus: 'Current status',
  fields: {
    status: {
      label: ''
    },
    comment: {
      label: 'Comments',
      hint: 'Comments can be seen by establishment users, as well as inspectors and Home Office team members. They will be added to the \'Latest activity\' log of this task. '
    }
  },
  'sticky-nav': {
    activity: 'Latest activity',
    establishment: 'Establishment details',
    comments: 'Reason for amendment',
    revocation: 'Reason for revocation',
    status: 'What do you want to do?',
    conditions: 'Additional conditions'
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
    withdrawAction: 'Withdraw {{type}}'
  },
  deadline: {
    hint: 'The statutory target deadline for complex or multidisciplinary applications can be extended by up to 15 working days.',
    extend: {
      title: 'Extend statutory deadline',
      button: 'Extend deadline'
    }
  },
  actions: {
    change: 'Change',
    withdraw: 'Withdraw'
  },
  asruDiscardTask: {
    summary: 'Discard this task',
    details: 'This task will be closed without any information being updated. This action cannot be undone.',
    action: 'Discard task'
  },
  errors: {
    status: {
      required: 'Please select an option from the list',
      definedValues: 'Please select an option from the list'
    },
    comment: {
      customValidate: 'Please provide a reason'
    }
  },
  buttons: {
    submit: 'Continue'
  }
};
