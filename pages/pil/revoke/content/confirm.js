const { merge } = require('lodash');
const baseContent = require('./');

module.exports = merge({}, baseContent, {
  title: 'Confirm personal licence revocation'
});
