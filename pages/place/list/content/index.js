const { merge } = require('lodash');
const commonContent = require('../../content');

module.exports = merge({}, commonContent, {
  addNew: 'Create approved area',
  filters: {
    filterBy: 'Filter by',
    applyLabel: 'Apply filters',
    clearLabel: 'Clear filters'
  },
  buttons: {
    edit: 'Amend'
  }
});
