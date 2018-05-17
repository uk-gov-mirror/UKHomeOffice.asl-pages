const { combineReducers } = require('redux');
const { url, establishment, list, filters, sort } = require('../../lib/reducers');

module.exports = combineReducers({
  url,
  establishment,
  list,
  filters,
  sort
});
