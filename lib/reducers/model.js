const { without } = require('lodash');

const INITIAL_STATE = {};

const fieldReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      if (Array.isArray(state)) {
        if (state.includes(action.value)) {
          return without(state, action.value);
        }
        return [ ...state, action.value ];
      }
      return action.value;
  }
  return state;
};

module.exports = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.key]: fieldReducer(state[action.key], action)
      };
  }
  return state;
};
