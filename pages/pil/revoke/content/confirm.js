const { merge } = require('lodash');
const baseContent = require('./');

module.exports = merge({}, baseContent, {
  title: 'Confirm revocation',
  buttons: {
    submit: 'Submit'
  }
});
