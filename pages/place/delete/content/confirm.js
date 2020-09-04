const { merge } = require('lodash');
const confirmContent = require('../../update/content/confirm');
const baseContent = require('./');

module.exports = merge({}, confirmContent, baseContent, {
  subtitle: 'Remove approved area',
  buttons: {
    submit: 'Submit'
  }
});
