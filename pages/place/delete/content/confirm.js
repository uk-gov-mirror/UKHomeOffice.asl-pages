const { merge } = require('lodash');
const confirmContent = require('../../update/content/confirm');

module.exports = merge({}, confirmContent, {
  subtitle: 'Remove premises'
});
