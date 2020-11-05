const { merge } = require('lodash');
const baseContent = require('./base');

module.exports = merge({}, baseContent, {
  deadline: {
    passed: {
      title: 'Confirm reason for statutory deadline passing',
      summary: {
        singular: 'This application is {{days}} day after the deadline for when a decision was due. Confirm the reason so ASRU can record if it\'s a justified delay.',
        plural: 'This application is {{days}} days after the deadline for when a decision was due. Confirm the reason so ASRU can record if it\'s a justified delay.'
      }
    }
  },
  fields: {
    'deadline-passed-reason': {
      label: 'Reason for statutory deadline passing',
      hint: 'Visible only to ASRU business support'
    }
  },
  errors: {
    'deadline-passed-reason': {
      required: 'Please provide a reason'
    }
  },
  buttons: {
    submit: 'Continue'
  }
});
