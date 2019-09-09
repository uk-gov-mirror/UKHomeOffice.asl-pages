module.exports = {
  'sticky-nav': {
    'submitted-version': 'Latest submission',
    granted: 'Granted licence',
    'licence-holder': 'PPL holder',
    experience: 'PPL holder experience',
    deadline: 'Statutory target deadline'
  },
  fields: {
    status: {
      label: ''
    },
    licenceHolder: {
      label: ''
    }
  },
  versions: {
    granted: {
      label: 'View granted licence',
      info: 'Read the version of this project licence that is currently active'
    },
    submitted: {
      label: 'View latest submission',
      hint: 'This is the {{type}} that has been submitted for approval.'
    }
  },
  declarations: {
    'pel-holder': {
      question: 'Does this application have the endorsement of your primary establishment\'s PEL holder?',
      name: 'PEL Holder:',
      'endorsement-date': 'Endorsement date: '
    },
    'awerb': {
      question: 'Has the application been reviewed by the AWERB of each relevant establishment?',
      'review-date': 'AWERB review date:',
      'no-review-reason': 'Why has this amendment not been reviewed by the AWERB of each relevant establishment?'
    },
    'ready-for-inspector': {
      question: 'Has an inspector advised that this version of the draft application is ready for assessment?'
    }
  }
};
