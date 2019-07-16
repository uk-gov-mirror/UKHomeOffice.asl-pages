const { merge } = require('lodash');
const baseContent = require('./base');

module.exports = merge({}, baseContent, {
  fields: {
    comment: {
      label: 'Comments',
      hint: 'Comments can be seen by establishment users, as well as inspectors and Home Office team members.'
    }
  }
});
