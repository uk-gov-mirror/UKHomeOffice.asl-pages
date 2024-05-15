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
      label: '{{#commentRequired}}Reason for {{commentLabel}}{{/commentRequired}}{{^commentRequired}}Comments (optional){{/commentRequired}}',
      hint: 'Your {{#commentRequired}}reason{{/commentRequired}}{{^commentRequired}}comments{{/commentRequired}} will be recorded and visible to relevant establishment and Home Office staff.'
    },
    assignedTo: {
      label: 'Assign to:'
    }
  },
  commentLabels: {
    'returned-to-applicant': 'returning to applicant',
    'referred-to-inspector': 'inspector referral',
    'inspector-rejected': 'refusal',
    'rejected': 'refusal',
    'intention-to-refuse': 'refusal',
    'discarded-by-asru': 'discarding'
  },
  'sticky-nav': {
    details: 'Details',
    status: 'Status',
    activity: 'Latest activity',
    establishment: 'Establishment details',
    comments: {
      application: 'Comments',
      amendment: 'Reason for amendment',
      revocation: 'Reason for revocation',
      transfer: 'Reason for transfer',
      review: 'Comments'
    },
    'next-steps': 'What do you want to do?',
    'asru-assignment': 'Task assignment',
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
  removeDeadline: {
    hint: 'The statutory target deadline for applications that are not complete and correct can be removed. You will still be able to continue your assessment.',
    title: 'Mark as not complete and correct',
    button: 'Remove deadline',
    markIncompleteButton: 'Mark incomplete or incorrect'
  },
  reinstateDeadline: {
    text: 'The application is not complete and correct so the statutory deadline is not applicable.',
    hint: 'You can reinstate the statutory deadline if the statutory deadline was removed in error. You will still be able to continue your assessment.',
    title: 'Reinstate statutory deadline',
    button: 'Reinstate deadline'
  },
  actions: {
    change: 'Change',
    withdraw: 'Withdraw',
    cancel: 'Cancel'
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
    current: 'Current',
    proposed: 'Proposed',
    previous: 'Previous',
    'changed-to': 'Changed to'
  },
  profileLink: {
    global: 'Name',
    applicant: 'Applicant',
    licenceHolder: 'Licence holder',
    amendment: 'Current licence holder',
    pelh: 'Establishment licence holder',
    nprc: 'Named person responsible for compliance'
  }
};
