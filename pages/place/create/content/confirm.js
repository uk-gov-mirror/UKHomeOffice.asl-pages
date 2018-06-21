const { merge } = require('lodash');
const confirmPage = require('../../update/content/confirm');

module.exports = merge({}, confirmPage, {
  pages: {
    place: {
      confirm: 'Confirm addition'
    }
  }
});
