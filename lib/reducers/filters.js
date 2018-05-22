const {
  isEmpty,
  chain,
  some,
  get,
  pickBy,
  pick,
  every
} = require('lodash');

const flattenNestedCols = ({ row, schema, col }) => !isEmpty(schema)
  ? chain(schema)
    .pickBy((s, k) => col === '*' ? s.show : col === k)
    .mapValues((value, key) => get(row, value.accessor || key))
    .value()
  : col === '*' ? row : pick(row, col);

const doFilter = (value, filters, options) => {
  const comparator = options.comparator === 'AND' ? every : some;
  return comparator(filters, f => {
    if (Array.isArray(value)) {
      return some(value, v => doFilter(v, [ f ], options));
    }
    if (typeof value === 'string') {
      if (typeof f !== 'string') {
        return false;
      }
      return options.exact
        ? value.toLowerCase() === f.toLowerCase()
        : value.toLowerCase().includes(f.toLowerCase());
    }
    if (typeof value === 'number') {
      return f === value;
    }
  });
};

const applyFilters = ({ data, schema, filters }) =>
  every(filters, isEmpty)
    ? data
    : data.filter(row =>
      every(filters, (filter, col) =>
        some(
          flattenNestedCols({ row, schema, col }),
          (value, key) => doFilter(value, filter, schema[key] || {})
        )
      )
    );

const filtersReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_FILTERS':
      return { ...action.filters };
    case 'SET_FILTER':
      return pickBy({
        ...state,
        [action.key]: action.value ? [].concat(action.value) : []
      }, v => v);
  }
  return state;
};

filtersReducer.applyFilters = applyFilters;

module.exports = filtersReducer;
