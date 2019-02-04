const base = require('./base');
const { merge } = require('lodash');

module.exports = merge({}, base, {
  status: {
    'returned-to-applicant': {
      summary: 'The applicant has been notified about your decision'
    },
    'ntco-endorsed': {
      state: 'Application submitted to ASRU',
      summary: 'The applicant has been notified that their application has been endorsed.',
      whatNext: {
        title: 'What happens next?',
        summary: `The applicant is not licenced to carry out any new procedures until their licence application has been
          approved by ASRU.`
      },
      body: `ASRU will review the application, and will consult with an inspector if required. They may be in touch if
        they need more information.`
    }
  },
  task: {
    links: {
      tasklist: 'Tasks'
    }
  },
  states: {
    submitted: 'Submitted',
    endorsed: 'Endorsed',
    granted: 'Licence granted'
  }
});
