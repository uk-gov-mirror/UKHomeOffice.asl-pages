const { merge } = require('lodash');
const baseContent = require('../../create/content');

module.exports = merge({}, baseContent, {
  title: 'Update procedure',
  notifications: {
    updated: 'Row updated',
    deleted: 'Procedure deleted'
  }
});
