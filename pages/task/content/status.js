module.exports = {
  'new': {
    state: 'Incomplete'
  },
  create: {
    state: 'Case opened'
  },
  update: {
    state: 'Case updated'
  },
  'with-licensing': {
    state: 'Awaiting review'
  },
  'with-inspectorate': {
    state: 'Awaiting recommendation',
    action: 'Refer to inspector'
  },
  'referred-to-inspector': {
    state: 'Awaiting recommendation',
    action: 'Refer to inspector'
  },
  'returned-to-applicant': {
    state: 'Returned',
    action: 'Return to applicant'
  },
  'withdrawn-by-applicant': {
    state: 'Withdrawn',
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
    state: 'Recommendation made',
    action: 'Recommend for approval'
  },
  'inspector-rejected': {
    state: 'Recommendation made',
    action: 'Recommend for rejection'
  },
  resubmitted: {
    state: 'Submitted',
    action: 'Submit'
  },
  resolved: {
    state: 'Approved',
    action: 'Grant licence'
  },
  rejected: {
    state: 'Rejected',
    action: 'Reject'
  },
  'deadline-extension': {
    state: 'Deadline extended'
  }
};
