const { merge } = require('lodash');
const baseContent = require('./index');

module.exports = merge({}, baseContent, {
  title: 'Confirm change to primary establishment',
  summary: 'Changing the primary establishment will immediately transfer this draft project.',
  fields: {
    primaryEstablishment: {
      current: {
        label: 'Current primary establishment'
      },
      new: {
        label: 'New primary establishment'
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
