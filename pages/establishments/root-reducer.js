const { combineReducers } = require('redux');
const { url, list, filters, sort } = require('../../lib/reducers');

module.exports = combineReducers({
  list,
  filters,
  sort,
  url
});
