const { merge } = require('lodash');
const baseContent = require('../../../content');

module.exports = merge({}, baseContent, {
  title: 'Which role do you want to apply for?',
  fields: {
    type: {
      label: ''
    },
    rcvsNumber: {
      label: 'RCVS number'
    },
    comment: {
      label: 'Please explain why this person is suitable for the role.',
      hint: 'For example, please include any relevant training or explain why training is not necessary.'
    }
  },
  buttons: {
    submit: 'Continue'
  },
  errors: {
    role: {
      required: 'Please select a named role'
    }
  }
});
