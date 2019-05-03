const { merge } = require('lodash');
const baseContent = require('./base');

module.exports = merge({}, baseContent, {
  fields: {
    comment: {
      label: '',
      hint: 'Please tell us why you are extending this deadline by 15 days.'
    }
  }
});
