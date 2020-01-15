const baseContent = require('./index');
const { merge } = require('lodash');

module.exports = merge({}, baseContent, {
  title: 'Confirm change to date granted',
  expiryInThePast: `The issue date entered means the licence expiry will be in the past. This will immediately expire the licence.`,
  buttons: {
    submit: 'Update date granted'
  },
  notifications: {
    issueDateUpdated: 'Date granted updated'
  }
});
