const { merge } = require('lodash');
const baseContent = require('../../../profile/content');

module.exports = merge({}, baseContent, {
  title: 'Edit your details',
  pageTitle: 'Edit your details',
  fields: {
    comments: {
      label: 'Why are you making this change?',
      hint: 'If you are a licence holder or named person then your changes will need to be approved by the Home Office.'
    }
  },
  errors: {
    dob: {
      required: 'Date of birth is required',
      dateIsBefore: 'Your date of birth must be in the past.'
    }
  },
  buttons: {
    submit: 'Submit'
  }
});
