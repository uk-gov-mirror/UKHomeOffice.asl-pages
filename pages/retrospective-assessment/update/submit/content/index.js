module.exports = {
  title: 'Submit retrospective assessment',
  subtitle: 'Retrospective assessment',
  content: 'Your assessment will be sent to an establishment admin for approval. If it hasn’t been reviewed by an Animal Welfare and Ethical Review Body, this will need to be arranged before submission to the Home Office.',
  declarationTitle: 'Declaration',
  declaration: `I agree that this retrospective assessment:

* it's been reviewed by the AWERB
* uses everyday language appropriate to a lay audience
* it contains no information that could identify people, places or intellectual property

I have the establishment licence holder's authority for it to be made publicly available.`,
  fields: {
    comment: {
      label: 'Remarks (optional)',
      hint: 'Your remarks will be recorded and visible to relevant establishment and Home Office staff.'
    },
    'ra-awerb-date': {
      label: 'Date of most recent AWERB review',
      hint: 'For example: 12 2 2020'
    }
  },
  errors: {
    'ra-awerb-date': {
      required: 'Enter the date of the most recent AWERB review'
    }
  },
  buttons: {
    submit: '{{#canEndorse}}Endorse and submit now{{/canEndorse}}{{^canEndorse}}Submit now{{/canEndorse}}'
  }
};
