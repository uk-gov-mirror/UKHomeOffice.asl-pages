const { merge } = require('lodash');
const commonContent = require('../../content');

module.exports = merge({}, commonContent, {
  searchText: 'Search approved areas by name, site, area, NACWOs or NVSs/SQPs.',
  filters: {
    filterBy: 'Filter areas',
    applyLabel: 'Apply filters',
    clearLabel: 'Clear filters'
  },
  buttons: {
    edit: 'Amend'
  },
  actions: {
    addNew: 'Create approved area',
    download: 'Download all as CSV'
  }
});
