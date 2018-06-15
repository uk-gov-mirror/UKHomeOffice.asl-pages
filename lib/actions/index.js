const setSortColumn = column => ({
  type: 'SET_SORT_COLUMN',
  column
});

const setFilters = filters => ({
  type: 'SET_FILTERS',
  filters
});

const setFilter = (key, value) => ({
  type: 'SET_FILTER',
  key,
  value
});

const setField = (key, value) => ({
  type: 'SET_FIELD',
  key,
  value
});

module.exports = {
  setSortColumn,
  setFilters,
  setFilter,
  setField
};
