const { merge } = require('lodash');
const commonContent = require('../../content');

module.exports = merge({}, commonContent, {
  addNew: 'Create approved area',
  searchText: 'Search approved areas by name, site, area, NACWOs or NVSs/SQPs.',
  filters: {
    filterBy: 'Filter areas',
    applyLabel: 'Apply filters',
    clearLabel: 'Clear filters'
  },
  buttons: {
    edit: 'Amend'
  }
});
