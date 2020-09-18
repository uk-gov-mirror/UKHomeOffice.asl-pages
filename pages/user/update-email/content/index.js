const { merge } = require('lodash');
const baseContent = require('../../../profile/content');

module.exports = merge({}, baseContent, {
  title: 'Change your email address',
  pageTitle: 'Change your email address',
  fields: {
    email: {
      label: 'Your new email address',
      current: 'Your current email address',
      hint: ''
    },
    emailConfirm: {
      label: 'Confirm your new email address'
    },
    password: {
      label: 'Please enter your current password to authorise the change'
    }
  },
  'email-guidance': 'This will update the email you use to login and get notifications, for example if an application gets approved.',
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
      required: 'Please enter your password',
      invalid: 'The password you entered does not match our records'
    }
  },
  buttons: {
    submit: 'Continue'
  },
  notifications: {
    success: 'Email address updated'
  }
});
