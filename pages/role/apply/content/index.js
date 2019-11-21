const { merge } = require('lodash');
const baseContent = require('../../../profile/content');

module.exports = merge({}, baseContent, {
  title: 'Assign named role',
  fields: {
    type: {
      label: 'Which named role do you want to assign?'
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
