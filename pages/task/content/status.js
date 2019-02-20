module.exports = {
  'new': {
    state: 'Incomplete'
  },
  'with-licensing': {
    state: 'Awaiting review'
  },
  'with-inspectorate': {
    state: 'With inspectorate',
    action: 'Refer to inspector'
  },
  // left for backwards compatibility
  'referred-to-inspector': {
    state: 'Awaiting inspection',
    action: 'Refer to inspector'
  },
  'returned-to-applicant': {
    state: 'Returned to applicant',
    action: 'Return to applicant'
  },
  'withdrawn-by-applicant': {
    state: 'Withdrawn by applicant',
    action: 'Withdraw'
  },
  'with-ntco': {
    state: 'Awaiting endorsement'
  },
  'ntco-endorsed': {
    state: 'Awaiting review',
    action: 'Endorse application'
  },
  'inspector-recommended': {
    state: 'Recommended',
    action: 'Recommend'
  },
  'inspector-rejected': {
    state: 'Not recommended',
    action: 'Recommend for rejection'
  },
  resubmitted: {
    state: 'Resubmitted',
    action: 'Resubmit'
  },
  resolved: {
    state: 'Resolved',
    action: 'Update licence'
  },
  rejected: {
    state: 'Rejected',
    action: 'Reject'
  }
};
