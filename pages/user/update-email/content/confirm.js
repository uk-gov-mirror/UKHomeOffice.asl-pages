const merge = require('lodash/merge');
const baseContent = require('./index');

module.exports = merge({}, baseContent, {
  fields: {
    email: {
      label: 'Email address'
    }
  }
});
