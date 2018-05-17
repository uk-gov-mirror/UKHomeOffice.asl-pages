const { combineReducers } = require('redux');
const { url, establishment } = require('../../lib/reducers');

module.exports = combineReducers({
  establishment,
  url
});
