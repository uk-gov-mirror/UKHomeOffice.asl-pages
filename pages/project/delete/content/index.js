const { merge } = require('lodash');
const baseContent = require('../../content');

module.exports = merge({}, baseContent, {
  notifications: {
    draftDiscarded: 'Project draft discarded',
    amendmentDiscarded: 'Project amendment discarded',
    stubDiscarded: 'Project stub discarded'
  }
});
