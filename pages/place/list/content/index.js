const { merge } = require('lodash');
const commonContent = require('../../content');

module.exports = merge({}, commonContent, {
  addNew: 'Add premises',
  filters: {
    filterBy: 'Filter by',
    applyLabel: 'Apply changes',
    clearLabel: 'Clear changes'
  }
});
