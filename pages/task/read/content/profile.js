const profile = require('../../../user/update/content');
const { merge } = require('lodash');

module.exports = merge({}, profile, {
  title: {
    amendment: 'Review amendment'
  },
  'sticky-nav': {
    changes: 'Amendment requested',
    comments: {
      amendment: 'Why are you making this amendment?'
    }
  },
  'no-comments': 'No reason provided'
});
