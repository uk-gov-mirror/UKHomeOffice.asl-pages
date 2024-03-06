import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

export function buildMockStore(state) {
  return configureStore([])(state);
}

export function MockReduxProvider({state, children}) {
  return <Provider store={buildMockStore(state)}>{children}</Provider>;
}
