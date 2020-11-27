const status = require('../../content/status');
const tasks = require('../../content/tasks');

module.exports = {
  status,
  tasks,
  title: {
    default: 'Review {{type}}'
  },
  currentStatus: 'Current status',
  fields: {
    status: {
      label: ''
    },
    comment: {
      label: '{{#commentRequired}}Reason for {{commentLabel}}{{/commentRequired}}{{^commentRequired}}Remarks (optional){{/commentRequired}}',
      hint: 'Your {{#commentRequired}}reason{{/commentRequired}}{{^commentRequired}}remarks{{/commentRequired}} will be recorded and visible to relevant establishment and Home Office personnel.'
    }
  },
  commentLabels: {
    'returned-to-applicant': 'returning to applicant',
    'referred-to-inspector': 'inspector referral',
    'inspector-rejected': 'refusal',
    'rejected': 'refusal',
    'discarded-by-asru': 'discarding'
  },
  'sticky-nav': {
    status: 'Status',
    activity: 'Latest activity',
    establishment: 'Establishment details',
    comments: {
      application: 'Comments',
      amendment: 'Reason for amendment',
      revocation: 'Reason for revocation',
      review: 'Comments'
    },
    'next-steps': 'What do you want to do?',
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
      required: 'Please provide a reason',
      customValidate: 'Please provide a reason'
    }
  },
  buttons: {
    submit: 'Continue'
  },
  diff: {
    previous: 'Previous',
    'changed-to': 'Changed to'
  }
};
