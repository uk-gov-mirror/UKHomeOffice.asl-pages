const merge = require('lodash/merge');
const baseContent = require('./index');

module.exports = merge({}, baseContent, {
  buttons: {
    submit: 'Submit'
  }
});
