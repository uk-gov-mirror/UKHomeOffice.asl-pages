const { merge } = require('lodash');
const baseContent = require('../../content');

module.exports = merge(baseContent, {
  status: {
    inactive: 'You do not currently hold a Personal Licence, [click here]({{url}}) to apply for one'
  }
});
