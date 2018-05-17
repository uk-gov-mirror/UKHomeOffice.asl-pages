/* eslint implicit-dependencies/no-implicit: [2, { dev: true }] */

import React from 'react';
import url from 'url';
import { stringify } from 'qs';
import { render } from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import Component from '../../../{{page}}/views';
import rootReducer from '../../../{{page}}/root-reducer';

const persistState = store => next => action => {
  const result = next(action);
  switch (action.type) {
    case 'SET_SORT':
    case 'SET_FILTERS':
      const { filters, sort } = store.getState();
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

const store = createStore(rootReducer, window.INITIAL_STATE, applyMiddleware(...middleware));

render(
  <Provider store={store}>
    <Component />
  </Provider>,
  document.getElementById('page-component')
);
