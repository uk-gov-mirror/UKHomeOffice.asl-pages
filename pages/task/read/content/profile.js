const profile = require('../../../user/update/content');
const { merge } = require('lodash');

module.exports = merge({}, profile, {
  'sticky-nav': {
    changes: 'Amendment requested',
    comments: 'Why are you making this amendment?'
  },
  'no-comments': 'No reason provided'
});
