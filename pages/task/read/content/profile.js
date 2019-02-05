const profile = require('../../../user/update/content');
const { merge } = require('lodash');

module.exports = merge({}, profile, {
  updateTitle: 'Review profile change request',
  'sticky-nav': {
    changes: 'Changes requested',
    comments: 'Reason for change',
    status: 'Make decision'
  },
  'no-comments': 'No reason provided'
});
