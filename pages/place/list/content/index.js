const { merge } = require('lodash');
const commonContent = require('../../content');

module.exports = merge({}, commonContent, {
  filters: {
    filterBy: 'Filter by',
    applyLabel: 'Apply changes',
    clearLabel: 'Clear changes'
  }
});
