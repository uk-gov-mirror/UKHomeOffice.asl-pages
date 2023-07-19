module.exports = {
  'new': {
    state: 'Incomplete'
  },
  create: {
    state: 'Task opened'
  },
  update: {
    state: 'Task updated',
    log: 'Updated by'
  },
  assign: {
    state: 'Task assigned',
    log: 'Assigned by'
  },
  'deadline-extended': {
    state: 'Deadline extended',
    log: 'Deadline for decision extended by'
  },
  'deadline-removed': {
    state: 'Deadline removed',
    log: 'Deadline for decision removed by'
  },
  'deadline-reinstated': {
    state: 'Deadline reinstated',
    log: 'Deadline for decision reinstated by'
  },
  'with-licensing': {
    state: 'Awaiting decision',
    log: 'Submitted by',
    currentlyWith: '**Currently with:** Home Office Licensing Officer'
  },
  'with-inspectorate': {
    state: 'Awaiting decision',
    action: 'Refer to inspector',
    log: 'Submitted by',
    currentlyWith: '**Currently with:** Home Office Inspector'
  },
  'referred-to-inspector': {
    state: 'Awaiting decision',
    action: 'Refer to inspector',
    hint: {
      application: 'The application will be sent to an inspector for assessment.',
      amendment: 'The amendment will be sent to an inspector for assessment.',
      revocation: 'The revocation request will be sent to an inspector for assessment.',
      transfer: 'The transfer request will be sent to an inspector for assessment.',
      ra: 'The assessment will be sent to an an inspector for assessment.'
    },
    log: 'Referred by',
    currentlyWith: '**Currently with:** Home Office Inspector'
  },
  'returned-to-applicant': {
    state: 'Returned',
    action: 'Return to applicant',
    hint: {
      application: 'The application will be returned to the applicant with your comments.',
      amendment: 'The amendment will be returned to the applicant with your comments.',
      revocation: 'The revocation request will be returned to the applicant with your comments.',
      transfer: 'The transfer request will be returned to the applicant with your comments.',
      review: 'The review request will be returned to the applicant with your comments.',
      ra: 'The assessment will be returned to the applicant with your comments.'
    },
    log: 'Returned by',
    currentlyWith: '**Currently with:** Applicant'
  },
  'recalled-by-applicant': {
    state: 'Recalled',
    action: {
      application: 'Recall application',
      amendment: 'Recall amendment',
      revocation: 'Recall revocation',
      transfer: 'Recall transfer',
      review: 'Recall review',
      ra: 'Recall retrospective assessment'
    },
    hint: {
      default: 'The task will be returned and can be edited.'
    },
    log: 'Recalled by',
    currentlyWith: '**Currently with:** Applicant'
  },
  'discarded-by-applicant': {
    state: 'Discarded',
    action: {
      application: 'Discard application',
      amendment: 'Discard amendment',
      revocation: 'Discard revocation',
      transfer: 'Discard transfer',
      review: 'Discard review',
      ra: 'Discard retrospective assessment'
    },
    hint: {
      application: 'You will need to create a new application to apply for this type of licence in the future.',
      amendment: 'You will need to create a new amendment to submit these changes again.',
      revocation: 'You will need to create a new revocation request for this licence to be revoked.',
      transfer: 'You will need to start a new transfer request if you still wish to transfer this licence.',
      review: 'You’ll need to start again if your licence is still due its 5 year review.',
      ra: 'You’ll need create a new assessment if your licence is still due a retrospective assessment.'
    },
    log: 'Discarded by'
  },
  'withdrawn-by-applicant': {
    state: 'Withdrawn',
    action: {
      application: 'Withdraw application',
      amendment: 'Withdraw amendment',
      revocation: 'Withdraw revocation',
      transfer: 'Withdraw transfer'
    },
    hint: {
      application: 'The application will revert to a draft that can be opened from the applicant\'s profile page.',
      amendment: 'You will need to create a new amendment to submit these changes again.',
      revocation: 'You will need to create a new revocation request for this licence to be revoked.',
      transfer: 'You will need to create a new transfer request for this licence to be transferred.'
    },
    log: 'Withdrawn by'
  },
  'with-ntco': {
    state: 'Awaiting endorsement',
    log: 'Submitted by',
    currentlyWith: '**Currently with:** Named Training and Competency Officer'
  },
  'ntco-endorsed': {
    state: 'Awaiting decision',
    action: {
      application: 'Endorse application',
      amendment: 'Endorse amendment',
      transfer: 'Endorse transfer request'
    },
    hint: {
      application: 'You confirm that the applicant holds the necessary training or experience to carry out the categories of procedures listed in this application.',
      amendment: 'You confirm that the applicant holds the necessary training or experience to carry out the categories of procedures listed in this amendment.',
      transfer: 'You confirm that the applicant holds the necessary training or experience to carry out the categories of procedures listed in this transfer request.'
    },
    log: 'Endorsed by',
    currentlyWith: '**Currently with:** Home Office Licensing Officer'
  },
  // TODO: content
  'awaiting-endorsement': {
    state: 'Awaiting endorsement',
    log: 'Submitted by',
    currentlyWith: {
      pil: '**Currently with:** Named Training and Competency Officer',
      project: '**Currently with:** Establishment Admin'
    }
  },
  // TODO: content
  endorsed: {
    state: 'Awaiting recommendation',
    action: {
      application: 'Endorse application',
      amendment: 'Endorse amendment',
      transfer: 'Endorse transfer request',
      review: 'Endorse licence',
      ra: 'Endorse retrospective assessment'
    },
    log: 'Endorsed by'
  },
  'inspector-recommended': {
    state: 'Recommendation made',
    action: 'Recommend for approval',
    hint: {
      application: 'The application will be sent to a Licensing Officer who will action your recommendation.',
      amendment: 'The amendment will be sent to a Licensing Officer who will action your recommendation.',
      revocation: 'The revocation request will be sent to a Licensing Officer who will action your recommendation.',
      transfer: 'The transfer request will be sent to a Licensing Office who will action your recommendation',
      ra: 'The assessment will be sent to a Licensing Office who will action your recommendation'
    },
    log: 'Recommendation made by Inspector',
    recommendation: '**Recommendation:** Approve',
    currentlyWith: '**Currently with:** Home Office Licensing Officer'
  },
  'inspector-rejected': {
    state: 'Recommendation made',
    action: 'Recommend for rejection',
    hint: {
      application: 'The application will be sent to a Licensing Officer who will action your recommendation.',
      amendment: 'The amendment will be sent to a Licensing Officer who will action your recommendation.',
      revocation: 'The revocation request will be sent to a Licensing Officer who will action your recommendation.',
      transfer: 'The transfer request will be sent to a Licensing Officer who will action your recommendation.',
      ra: 'The assessment will be sent to a Licensing Officer who will action your recommendation.'
    },
    log: 'Recommendation made by Inspector',
    recommendation: '**Recommendation:**  Reject',
    currentlyWith: '**Currently with:** Home Office Licensing Officer'
  },
  resubmitted: {
    state: 'Submitted',
    action: {
      application: 'Submit application',
      amendment: 'Submit amendment',
      'role-amendment': 'Add remark and resubmit the amendment',
      revocation: 'Submit revocation',
      transfer: 'Submit transfer',
      review: 'Submit review',
      ra: 'Submit retrospective assessment'
    },
    hint: {
      application: 'Your application will be sent to the Home Office for review.',
      amendment: 'Your amendment will be sent to the Home Office for review.',
      revocation: 'Your revocation request will be sent to the Home Office for review.',
      transfer: 'Your transfer request will be sent to the Home Office for review',
      ra: 'Your assessment will be sent to the Home Office for review'
    },
    log: 'Submitted by'
  },
  resolved: {
    state: 'Approved',
    action: {
      application: 'Grant licence',
      amendment: 'Amend licence',
      revocation: 'Revoke licence',
      transfer: 'Approve transfer',
      ra: 'Approve retrospective assessment'
    },
    hint: {
      application: 'Upload the harm benefit analysis and a new licence will be granted.',
      amendment: 'The existing licence will be updated.',
      revocation: 'The existing licence will be revoked.',
      transfer: 'The licence will be transferred to the proposed establishment.',
      ra: 'The assessment will be added to the project\'s non-technical summary'
    },
    log: {
      application: 'Granted by',
      amendment: 'Approved by',
      revocation: 'Revoked by',
      transfer: 'Approved by',
      review: 'Reviewed by',
      ra: 'Approved by',
      suspension: 'Suspended by',
      reinstatement: 'Reinstated by'
    },
    'by-pelh': 'Approved by establishment licence holder',
    'on-behalf-of-pelh': 'Approved on behalf of establishment licence holder by'
  },
  rejected: {
    state: 'Rejected',
    action: {
      application: 'Reject application',
      amendment: 'Reject amendment',
      revocation: 'Reject revocation',
      transfer: 'Reject transfer request',
      ra: 'Reject retrospective assessment'
    },
    hint: {
      application: 'The applicant will need to create a new application to apply for this type of licence in the future.',
      amendment: 'The applicant will need to create a new amendment to submit these changes again.',
      revocation: 'The applicant will need to create a new revocation request for this licence to be revoked.',
      transfer: 'The applicant will need to create a new transfer request.',
      ra: 'The applicant will need to create a new assessment.'
    },
    log: 'Rejected by'
  },
  'intention-to-refuse': {
    state: 'Returned',
    action: 'Notify of intention to refuse',
    hint: {
      application: 'The applicant will be sent a notice with 28 days to respond.'
    },
    log: {
      application: 'Notice of intention to refuse issued by'
    },
    warning: {
      future: `The Home Office are planning to refuse this application. You have until {{respondBy}} to respond.`,
      futureAsru: `The Home Office are planning to refuse this application. The applicant has until {{respondBy}} to respond.`,
      passed: 'The 28 day deadline for responding to the intention to refuse notice has passed.',
      passedAsru: 'The 28 day deadline for responding to the intention to refuse notice has passed. If the applicant has not responded you should refuse the licence.'
    }
  },
  refused: {
    state: 'Refused',
    action: 'Refuse licence',
    hint: {
      application: 'The 28 day deadline for responding to the refusal notice has passed. If the applicant has not responded you should refuse the licence.'
    },
    log: 'Refused by'
  },
  reopened: {
    state: 'Reopened',
    log: 'Reopened by'
  },
  recovered: {
    state: 'Reopened',
    log: 'Reopened by'
  },
  'deadline-extension': {
    state: 'Deadline extended',
    log: 'Deadline for decision extended by'
  },
  updated: {
    state: 'Resubmitted',
    action: {
      application: 'Edit and resubmit the application',
      amendment: 'Edit and resubmit the amendment',
      transfer: 'Edit and resubmit the transfer request',
      review: 'Edit and resubmit the review',
      ra: 'Edit and resubmit the retrospective assessment'
    },
    hint: {
      application: 'Make changes to the application you previously submitted and respond to any comments.',
      amendment: 'Make changes to the amendment you previously submitted and respond to any comments.',
      transfer: 'Make changes to the transfer request you previously submitted and respond to any comments.',
      ra: 'Make changes to the assessment you previously submitted and respond to any comments.'
    },
    log: 'Submitted by'
  },
  'discarded-by-asru': {
    state: 'Discarded',
    action: {
      application: 'Discard application',
      amendment: 'Discard amendment',
      revocation: 'Discard revocation',
      transfer: 'Discard transfer',
      ra: 'Discard retrospective assessment'
    },
    hint: {
      application: 'You will need to create a new application to apply for this type of licence in the future.',
      amendment: 'You will need to create a new amendment to submit these changes again.',
      revocation: 'You will need to create a new revocation request for this licence to be revoked.',
      transfer: 'You will need to start a new transfer request if you still wish to transfer this licence.',
      ra: 'You will need to start a new assessment if this licence still requires a retrospective assessment.'
    },
    log: 'Discarded by'
  },
  autoresolved: {
    state: 'Approved',
    log: 'Automatically approved'
  },
  autodiscarded: {
    log: 'Automatically discarded'
  }
};
