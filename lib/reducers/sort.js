const { orderBy, get } = require('lodash');

const INITIAL_STATE = {
  column: '',
  ascending: true
};

const sortReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_SORT_COLUMN':
      return {
        column: action.column,
        ascending: state.column === action.column ? !state.ascending : true
      };
    case 'SET_SORT':
      return action.sort;
  }
  return state;
};

const getSortedData = ({ data, schema, sort: { ascending, column } }) =>
  column
    ? orderBy(data, item =>
      schema[column] && schema[column].sort
        ? schema[column].sort(item)
        : get(item, (schema[column] && schema[column].accessor) || column),
    ascending ? 'asc' : 'desc')
    : data;

sortReducer.getSortedData = getSortedData;

module.exports = sortReducer;
