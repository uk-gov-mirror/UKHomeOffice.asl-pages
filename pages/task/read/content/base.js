module.exports = {
  title: 'Review Application',
  status: {
    title: 'Current status',
    'with-licensing': 'With licensing',
    'referred-to-inspector': 'Referred to inspector',
    'returned-to-applicant': 'Returned to applicant',
    'withdrawn-by-applicant': 'Withdrawn by applicant',
    'with-ntco': 'With NTCO',
    'ntco-endorsed': 'NTCO endorsed',
    'inspector-recommended': 'Inspector recommended for approval',
    'inspector-rejected': 'Inspector recommended for rejected'
  },
  fields: {
    status: {
      label: 'What is your decision?'
    },
    comment: {
      label: 'Comments'
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
        label: 'Update licence'
      },
      'rejected': {
        label: 'Reject'
      }
    }
  },
  'sticky-nav': {
    comments: 'Comments'
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
