module.exports = {
  'sticky-nav': {
    'submitted-version': 'Latest submission',
    granted: 'Granted licence',
    'licence-holder': 'PPL holder',
    experience: 'PPL holder experience',
    deadline: 'Statutory target deadline',
    continuation: 'Project continuation',
    ra: 'Retrospective assessment',
    reopen: 'Reopen task'
  },
  title: {
    ra: 'Review retrospective assessment'
  },
  ra: {
    due: '**Deadline for submission: {{date}}**',
    content:
      'This is the retrospective assessment that has been submitted for approval.',
    view: 'View retrospective assessment'
  },
  continuation: {
    title: 'Project continuation',
    licence: 'From the licence',
    rte: 'Original continuation input',
    from: 'From project licence {{licenceNumber}}',
    expiry: 'expiring on {{expiry}}'
  },
  fields: {
    status: {
      label: ''
    },
    licenceHolder: {
      label: ''
    }
  },
  status: {
    endorsed: {
      hint: 'Confirm the PEL holder approves this application.',
      log: 'Endorsed on behalf of the PEL holder at {{establishmentName}} by'
    }
  },
  versions: {
    granted: {
      label: 'View granted licence',
      info: 'Read the version of this project licence that is currently active'
    },
    submitted: {
      label: 'View latest submission',
      discarded: 'This submission was discarded on {{date}}',
      text: 'This is the application that has been submitted for approval.'
    }
  },
  establishment: {
    current: 'Current establishment',
    proposed: 'Proposed establishment',
    previous: 'Previous establishment',
    new: 'New establishment'
  },
  'additional-establishments': {
    title: 'Additional establishments'
  },
  declarations: {
    'pel-holder': {
      question: 'PEL holder endorsement:',
      name: 'PEL Holder:',
      'endorsement-date': 'Endorsement date: '
    },
    awerb: {
      question: 'AWERB required:',
      'review-date': 'AWERB review date:',
      'no-review-reason': 'Reason for no review:'
    },
    'ready-for-inspector': {
      question: 'Inspector confirmed ready:'
    }
  },
  view: {
    granted: 'View granted licence',
    version: 'View this version ({{date}})',
    nts: 'View non-technical summary',
    hba: 'Download harm benefit analysis'
  },
  reopen: {
    content: 'Reopen this task',
    button: 'Reopen task'
  },
  deadline: {
    decision: 'Deadline for decision: {{date}}',
    processBy: 'Process by: {{date}}',
    internal: 'Internal deadline',
    statutory: {
      standard: 'Statutory deadline for decision',
      extended: 'Extended deadline for decision'
    },
    extension: {
      action: 'Extend deadline',
      from: 'Deadline extended from: ',
      to: 'Deadline extended to: '
    },
    today: '(Deadline is today)',
    passed: {
      singular: '(Deadline passed {{days}} day ago)',
      plural: '(Deadline passed {{days}} days ago)'
    },
    lateDecision: {
      singular: '{{days}} day over deadline for decision',
      plural: '{{days}} days over deadline for decision'
    }
  }
};
