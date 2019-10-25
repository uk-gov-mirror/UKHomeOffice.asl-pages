const { merge } = require('lodash');
const baseContent = require('../../../profile/content');

module.exports = merge({}, baseContent, {
  title: 'Change your email address',
  fields: {
    email: {
      label: 'Your new email address',
      current: 'Your current email address'
    },
    emailConfirm: {
      label: 'Confirm your new email address'
    },
    password: {
      label: 'Password'
    }
  },
  errors: {
    email: {
      required: 'Please enter a new email address',
      customValidate: 'Please enter a valid email address',
      inUse: 'This email address is already in use'
    },
    emailConfirm: {
      required: 'Please confirm your new email address',
      customValidate: 'Please confirm your new email address is correct'
    },
    password: {
      required: 'Please enter your password'
    }
  },
  buttons: {
    submit: 'Continue'
  }
});
