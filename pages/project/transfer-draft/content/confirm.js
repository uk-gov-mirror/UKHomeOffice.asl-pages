const { merge } = require('lodash');
const baseContent = require('./index');

module.exports = merge({}, baseContent, {
  title: 'Confirm change to primary establishment',
  fields: {
    primaryEstablishment: {
      current: {
        label: 'Current primary establishment'
      }
    }
  },
  buttons: {
    submit: 'Change primary establishment'
  },
  notifications: {
    success: 'Primary establishment was changed'
  }
});
