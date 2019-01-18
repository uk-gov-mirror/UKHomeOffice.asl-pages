module.exports = {
  title: 'Review Application',
  fields: {
    decision: {
      label: 'What is your decision?'
    },
    reason: {
      label: 'Reason for decision'
    },
    options: {
      'ntco-endorsed': {
        label: 'Endorse application'
      },
      'resubmitted': {
        label: 'Resubmit'
      },
      'returned-to-applicant': {
        label: 'Return to applicant'
      },
      'withdrawn-by-applicant': {
        label: 'Withdraw'
      },
      'referred-to-inspector': {
        label: 'Refer to inspector'
      },
      'inspector-recommended': {
        label: 'Recommend'
      },
      'inspector-rejected': {
        label: 'Recommend for rejection'
      },
      'resolved': {
        label: 'Grant licence'
      },
      'rejected': {
        label: 'Reject'
      }
    }
  },
  task: {
    submittedBy: 'Submitted by',
    submittedOn: 'on {{date}}.',
    applicantName: 'Applicant name',
    confirm: require('./confirm')
  },
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
