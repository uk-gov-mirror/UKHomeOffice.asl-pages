const { merge } = require('lodash');
const baseContent = require('../../../profile/content');

module.exports = merge({}, baseContent, {
  title: 'Change your password',
  pageTitle: 'Change your password',
  logoutWarning: `Upon a successful password change you will be immediately logged out and will have to
  log in again with your new password.`,
  summary: `Your new password must contain:
  * at least ten characters
  * at least one uppercase character
  * at least one lowercase character
  * at least one digit`,
  fields: {
    oldPassword: {
      label: 'Please enter your current password to authorise the change'
    },
    password: {
      label: 'Your new password'
    },
    passwordConfirm: {
      label: 'Confirm your new password'
    }
  },
  errors: {
    oldPassword: {
      required: 'Please enter your password',
      invalid: 'The password you entered does not match our records'
    },
    password: {
      required: 'Please enter a new password',
      customValidate: 'Your password must match the requirements above'
    },
    passwordConfirm: {
      required: 'Please confirm your new password',
      customValidate: 'Your new passwords must match'
    }
  },
  buttons: {
    submit: 'Change password'
  },
  notifications: {
    success: 'Your password has been changed. Next time you log in you will need to use the new password.'
  }
});
