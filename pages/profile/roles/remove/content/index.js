const { merge } = require('lodash');
const baseContent = require('../../../content');

module.exports = merge({}, baseContent, {
  title: 'Amend profile',
  fields: {
    role: {
      label: ''
    },
    comment: {
      label: 'Why are you removing this named role from this person?'
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
