const { merge } = require('lodash');
const baseContent = require('../../../profile/content');

module.exports = merge({}, baseContent, {
  title: 'Update your email address',
  fields: {
    email: {
      label: 'Your new email address'
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
      required: 'Please enter a valid email address',
      customValidate: 'Your new email address must be different from your old email address',
      inUse: 'This email address is already in use'
    },
    emailConfirm: {
      required: 'Please check your email address',
      customValidate: 'Please check your email address'
    },
    password: {
      required: 'Please enter your login password'
    }
  },
  buttons: {
    submit: 'Submit'
  }
});
