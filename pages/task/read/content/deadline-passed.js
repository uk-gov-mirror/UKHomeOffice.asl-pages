const { merge } = require('lodash');
const baseContent = require('./base');

module.exports = merge({}, baseContent, {
  deadline: {
    passed: {
      title: 'Confirm reason for statutory deadline passing',
      summary: 'A decision about this application was due on {{date}}. Confirm why the deadline was missed so ASRU can record if it\'s a justified delay.'
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
