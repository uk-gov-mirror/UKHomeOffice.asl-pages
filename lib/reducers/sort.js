const { orderBy } = require('lodash');
const { getValue } = require('../utils');

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

const getSortedData = ({ data, schema, sort: { ascending, column } }) => {
  if (column) {
    return orderBy(data, item =>
      getValue({ row: item, schema: schema[column], key: column })
      , ascending ? 'asc' : 'desc');
  }
  return data;
};

sortReducer.getSortedData = getSortedData;

module.exports = sortReducer;
