const { merge } = require('lodash');
const baseContent = require('../../../content');

module.exports = merge({}, baseContent, {
  title: 'Amend profile',
  fields: {
    type: {
      label: 'Please select the role you want to apply for.'
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
    type: {
      required: 'Please select a named role'
    }
  }
});
