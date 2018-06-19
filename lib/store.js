const url = require('url');
const { stringify } = require('qs');
const { applyMiddleware, createStore, combineReducers } = require('redux');
const allReducers = require('./reducers');

const persistState = store => next => action => {
  const result = next(action);
  switch (action.type) {
    case 'SET_SORT_COLUMN':
    case 'SET_FILTERS':
    case 'SET_FILTER':
      const { datatable: { filters, sort } } = store.getState();
      const href = url.parse(window.location.href);
      href.search = stringify({ filters, sort });
      window.history.replaceState(undefined, undefined, href.format());
  }
  return result;
};

const middleware = [persistState];

if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');
  middleware.push(logger);
}

const rootReducer = combineReducers(allReducers);
module.exports = createStore(rootReducer, window.INITIAL_STATE, applyMiddleware(...middleware));
