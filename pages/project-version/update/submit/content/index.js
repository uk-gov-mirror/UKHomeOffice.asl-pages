module.exports = {
  title: 'Send {{model.type}}',
  warning: {
    canEndorse: `This application needs to be endorsed by the establishment licence holder, and reviewed by the Animal Welfare and Ethical Review Body (AWERB) at the primary and any additional establishments, before a licence can be granted.`,
    cantEndorse: `The primary establishment will need to endorse your application, and confirm it’s been reviewed by the relevant Animal Welfare and Ethical Review Bodies (AWERBs), before a licence can be granted.`
  },
  declaration: {
    title: 'Declaration',
    content: 'You confirm the establishment licence holder consents to you endorsing this application on their behalf.'
  },
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
    comments: {
      label: 'Reason for amendment',
      hint: 'Briefly summarise what\'s changed and why'
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
    comments: {
      required: 'Please provide a reason'
    }
  },
  buttons: {
    submit: {
      application: 'Submit {{#canEndorse}}to Home Office{{/canEndorse}}{{^canEndorse}}PPL application{{/canEndorse}}',
      amendment: 'Submit PPL amendment'
    }
  }
};
