const { merge } = require('lodash');
const baseContent = require('../../create/content');

module.exports = merge({}, baseContent, {
  title: 'Edit row {{rowNum}}',
  notifications: {
    updated: 'Row updated',
    deleted: 'Procedure deleted'
  },
  buttons: {
    submit: 'Update row',
    delete: 'Delete row'
  }
});
