module.exports = {
  title: 'Send {{model.type}}',
  warning: 'Project licence applications need to be reviewed by an AWERB and endorsed by the primary establishment\'s PEL holder before a licence can be granted.',
  fields: {
    authority: {
      label: 'Does this {{model.type}} have the endorsement of your primary establishment\'s PEL holder?',
      hint: 'The Home Office may be in touch with your establishment to collect evidence of this endorsement.'
    },
    'authority-pelholder-name': {
      label: 'Please state the name of your primary establishment’s PEL holder'
    },
    'authority-endorsement-date': {
      label: 'Please state the date of their endorsement'
    },
    awerb: {
      label: 'Has this {{model.type}} been reviewed by the AWERB of each relevant establishment?'
    },
    'awerb-review-date': {
      label: 'Please state the date of the most recent AWERB review for each relevant establishment.'
    },
    'awerb-no-review-reason': {
      label: 'Why has this amendment not been reviewed by the AWERB of each relevant establishment?'
    },
    ready: {
      label: 'Has an inspector advised you that this version of your application is ready for assessment?'
    },
    comment: {
      label: 'Comments',
      hint: 'Comments can be seen by inspectors and Home Office team members. They will be added to the \'Latest activity\' log of this task.'
    },
    reason: {
      label: 'Why are you making this amendment?'
    }
  },
  errors: {
    authority: {
      required: 'Select an option'
    },
    'authority-pelholder-name': {
      customValidate: 'Please provide the name of the PEL holder'
    },
    'authority-endorsement-date': {
      customValidate: 'Please provide the endorsement date'
    },
    awerb: {
      required: 'Select an option'
    },
    'awerb-review-date': {
      customValidate: 'Please provide the AWERB review date(s)'
    },
    'awerb-no-review-reason': {
      customValidate: 'Please explain why there was no AWERB review'
    },
    ready: {
      required: 'Select an option'
    },
    reason: {
      required: 'Please provide a reason'
    }
  },
  buttons: {
    submit: {
      application: 'Submit PPL application',
      amendment: 'Submit PPL amendment'
    }
  }
};
