const filters = require('./filters');
const sort = require('./sort');

const INITIAL_STATE = {
  data: [],
  filters: filters(undefined, {}),
  sort: sort(undefined, {})
};

const datatable = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    filters: filters(state.filters, action),
    sort: sort(state.sort, action)
  };
};

datatable.applyFilters = filters.applyFilters;
datatable.getSortedData = sort.getSortedData;

module.exports = datatable;
