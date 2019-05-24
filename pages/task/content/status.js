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
    action: {
      application: 'Withdraw application',
      amendment: 'Withdraw amendment'
    }
  },
  'with-ntco': {
    state: 'Awaiting endorsement'
  },
  'ntco-endorsed': {
    state: 'Awaiting review',
    action: {
      application: 'Endorse application',
      amendment: 'Endorse amendment'
    }
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
    action: 'Resubmit'
  },
  resolved: {
    state: 'Approved',
    action: {
      application: 'Grant licence',
      amendment: 'Update licence'
    }
  },
  rejected: {
    state: 'Rejected',
    action: 'Reject'
  },
  'deadline-extension': {
    state: 'Deadline extended'
  }
};
