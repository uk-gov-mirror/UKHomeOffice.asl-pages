module.exports = {
  title: 'Send {{type}}',
  warning: {
    application: {
      isEndorsement: `This application needs to be endorsed by the establishment licence holder, and reviewed by the Animal Welfare and Ethical Review Body (AWERB) at the primary and any additional establishments, before a licence can be granted.`,
      needsEndorsement: `The primary establishment will need to endorse your application, and confirm it’s been reviewed by the relevant Animal Welfare and Ethical Review Bodies (AWERBs), before a licence can be granted.`
    },
    amendment: {
      isEndorsement: `This amendment needs to be endorsed by the establishment licence holder, and, if relevant, reviewed by the Animal Welfare and Ethical Review Body (AWERB) at the primary and any additional establishments, before a licence can be granted.`,
      needsEndorsement: `The primary establishment will need to endorse your amendment, and, if relevant, confirm it’s been reviewed by the relevant Animal Welfare and Ethical Review Bodies (AWERBs), before a licence can be granted.`
    }
  },
  declaration: {
    title: 'Declaration',
    content: `By endorsing this {{type}} on behalf of {{establishment.name}}, I agree that:
* {{licenceHolder}}'s training record is accurate and up to date.
* The non-technical summary uses everyday language and contains no information that could identify people, places or intellectual property.
{{#onBehalfOf}}

By submitting this {{type}} on behalf of {{licenceHolder}}, I agree that:
* they are aware I am making this submission and I have their permission to do so.
{{/onBehalfOf}}`
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
    'awerb-exempt': {
      label: 'Is this amendment exempt from a review by the AWERB of each relevant establishment?',
      hint: 'Only amendments that don\'t change the meaning of the licence, such as spelling corrections are exempt from an AWERB review.',
      options: {
        true: 'Yes',
        false: 'No'
      }
    },
    'awerb-dates': {
      label: 'Enter date of application\'s most recent AWERB review', // fallback (overridden by schema field label)
      hint: 'For example, 12 06 2020'
    },
    'awerb-no-review-reason': {
      label: 'Why has this amendment not been reviewed by the AWERB of each relevant establishment?'
    },
    ready: {
      label: 'Has an inspector advised you that this version of your application is ready for assessment?',
      options: {
        true: 'Yes',
        false: 'No'
      }
    },
    comment: {
      label: 'Remarks (optional)',
      hint: 'Your remarks will be recorded and visible to relevant establishment and Home Office personnel.'
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
      required: 'Please provide the AWERB review date(s)'
    },
    'awerb-exempt': {
      required: 'Select an option'
    },
    'awerb-dates': {
      required: 'Enter the date of the application\'s most recent AWERB review',
      validDate: 'Enter a valid date',
      dateIsBefore: 'Enter a valid date in the past'
    },
    'awerb-no-review-reason': {
      required: 'Please explain why there was no AWERB review'
    },
    ready: {
      required: 'Select an option'
    },
    comments: {
      required: 'Please provide a reason'
    }
  },
  buttons: {
    submit: 'Submit PPL {{type}}{{#canEndorse}} to Home Office{{/canEndorse}}'
  }
};
