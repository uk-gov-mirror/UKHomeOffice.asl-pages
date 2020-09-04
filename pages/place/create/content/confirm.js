const { merge } = require('lodash');
const confirmPage = require('../../update/content/confirm');
const baseContent = require('./');

module.exports = merge({}, confirmPage, baseContent, {
  pages: {
    place: {
      confirm: 'Confirm addition'
    }
  },
  subtitle: 'Add new approved area to {{site}}',
  buttons: {
    submit: 'Submit'
  }
});
