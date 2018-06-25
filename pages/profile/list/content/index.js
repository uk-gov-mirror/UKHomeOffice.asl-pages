const { merge } = require('lodash');
const commonContent = require('../../content');

module.exports = merge({}, commonContent, {
  searchText: 'Search by name or PIL number'
});
