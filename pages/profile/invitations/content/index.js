const { merge } = require('lodash');
const baseContent = require('../../content');

module.exports = merge({}, baseContent, {
  fields: {
    email: {
      label: 'Email'
    },
    updatedAt: {
      label: 'Invitation sent'
    },
    role: {
      label: 'Permission level'
    }
  },
  notifications: {
    cancel: 'Invitation cancelled',
    'delete': 'The invitation has been deleted',
    resend: 'The invitation has been resent'
  }
});
