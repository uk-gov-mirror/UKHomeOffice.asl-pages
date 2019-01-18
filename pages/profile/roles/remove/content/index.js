const { merge } = require('lodash');
const baseContent = require('../../../content');

module.exports = merge({}, baseContent, {
  title: 'Please select the role you want to remove',
  fields: {
    role: {
      label: ''
    },
    comment: {
      label: 'Please explain why you want to remove this person from the role.'
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
