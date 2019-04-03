const { merge } = require('lodash');
const baseContent = require('../../../content');

module.exports = merge({}, baseContent, {
  title: 'Profile amendment',
  fields: {
    type: {
      label: ''
    },
    rcvsNumber: {
      label: 'RCVS number'
    },
    comment: {
      label: 'Why is this person suitable for this named role?',
      hint: 'Include any relevant training in your answer, or explain why this training is not necessary.'
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
