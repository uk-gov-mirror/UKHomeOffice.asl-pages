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
    state: 'Awaiting review',
    log: 'Submitted by'
  },
  'with-inspectorate': {
    state: 'Awaiting recommendation',
    action: 'Refer to inspector',
    log: 'Submitted by'
  },
  'referred-to-inspector': {
    state: 'Awaiting recommendation',
    action: 'Refer to inspector',
    hint: {
      application: 'The application will be sent to an inspector for assessment.',
      amendment: 'The amendment will be sent to an inspector for assessment.',
      revocation: 'The revocation request will be sent to an inspector for assessment.'
    },
    log: 'Referred by'
  },
  'returned-to-applicant': {
    state: 'Returned',
    action: 'Return to applicant',
    hint: {
      application: 'The application will be returned to the applicant with your comments.',
      amendment: 'The amendment will be returned to the applicant with your comments.',
      revocation: 'The revocation request will be returned to the applicant with your comments.'
    },
    log: 'Returned by'
  },
  'recalled-by-applicant': {
    state: 'Recalled',
    action: {
      application: 'Recall application',
      amendment: 'Recall amendment',
      revocation: 'Recall revocation'
    },
    hint: 'The task will be returned and can be edited.',
    log: 'Recalled by'
  },
  'discarded-by-applicant': {
    state: 'Discarded',
    action: {
      application: 'Discard application',
      amendment: 'Discard amendment',
      revocation: 'Discard revocation'
    },
    hint: {
      application: 'You will need to create a new application to apply for this type of licence in the future.',
      amendment: 'You will need to create a new amendment to submit these changes again.',
      revocation: 'You will need to create a new revocation request for this licence to be revoked.'
    },
    log: 'Discarded by'
  },
  'withdrawn-by-applicant': {
    state: 'Withdrawn',
    action: {
      application: 'Withdraw application',
      amendment: 'Withdraw amendment',
      revocation: 'Withdraw revocation'
    },
    hint: {
      application: 'The application will revert to a draft that can be opened from the applicant\'s profile page.',
      amendment: 'You will need to create a new amendment to submit these changes again.',
      revocation: 'You will need to create a new revocation request for this licence to be revoked.'
    },
    log: 'Withdrawn by'
  },
  'with-ntco': {
    state: 'Awaiting endorsement',
    log: 'Submitted by'
  },
  'ntco-endorsed': {
    state: 'Awaiting review',
    action: {
      application: 'Endorse application',
      amendment: 'Endorse amendment'
    },
    hint: {
      application: 'You confirm that the applicant holds the necessary training or experience to carry out the categories of procedures listed in this application.',
      amendment: 'You confirm that the applicant holds the necessary training or experience to carry out the categories of procedures listed in this amendment.'
    },
    log: 'Endorsed by'
  },
  // TODO: content
  'awaiting-endorsement': {
    state: 'Awaiting endorsement',
    log: 'Submitted by'
  },
  // TODO: content
  endorsed: {
    state: 'Awaiting review',
    action: {
      application: 'Endorse application',
      amendment: 'Endorse amendment'
    },
    log: 'Endorsed by'
  },
  'inspector-recommended': {
    state: 'Recommendation made',
    action: 'Recommend for approval',
    hint: {
      application: 'The application will be sent to a Licensing Officer who will action your recommendation.',
      amendment: 'The amendment will be sent to a Licensing Officer who will action your recommendation.',
      revocation: 'The revocation request will be sent to a Licensing Officer who will action your recommendation.'
    },
    log: 'Recommended by',
    recommendation: '**Recommendation:** Approve'
  },
  'inspector-rejected': {
    state: 'Recommendation made',
    action: 'Recommend for rejection',
    hint: {
      application: 'The application will be sent to a Licensing Officer who will action your recommendation.',
      amendment: 'The amendment will be sent to a Licensing Officer who will action your recommendation.',
      revocation: 'The revocation request will be sent to a Licensing Officer who will action your recommendation.'
    },
    log: 'Recommended by',
    recommendation: '**Recommendation:**  Reject'
  },
  resubmitted: {
    state: 'Submitted',
    action: {
      application: 'Submit application',
      amendment: 'Submit amendment',
      revocation: 'Submit revocation'
    },
    hint: {
      application: 'Your application will be sent to the Home Office for review.',
      amendment: 'Your amendment will be sent to the Home Office for review.',
      revocation: 'Your revocation request will be sent to the Home Office for review.'
    },
    log: 'Submitted by'
  },
  resolved: {
    state: 'Approved',
    action: {
      application: 'Grant licence',
      amendment: 'Amend licence',
      revocation: 'Revoke licence'
    },
    hint: {
      application: 'A new licence will be granted.',
      amendment: 'The existing licence will be updated.',
      revocation: 'The existing licence will be revoked.'
    },
    log: {
      application: 'Granted by',
      amendment: 'Approved by',
      revocation: 'Revoked by'
    }
  },
  rejected: {
    state: 'Rejected',
    action: {
      application: 'Reject application',
      amendment: 'Reject amendment',
      revocation: 'Reject revocation'
    },
    hint: {
      application: 'The applicant will need to create a new application to apply for this type of licence in the future.',
      amendment: 'The applicant will need to create a new amendment to submit these changes again.',
      revocation: 'The applicant will need to create a new revocation request for this licence to be revoked.'
    },
    log: 'Rejected by'
  },
  'deadline-extension': {
    state: 'Deadline extended',
    log: 'Extended by'
  },
  updated: {
    state: 'Resubmitted',
    action: {
      application: 'Edit and resubmit the application',
      amendment: 'Edit and resubmit the amendment'
    },
    hint: {
      application: 'Make changes to the application you previously submitted and respond to any comments.',
      amendment: 'Make changes to the amendment you previously submitted and respond to any comments.'
    },
    log: 'Submitted by'
  }
};
