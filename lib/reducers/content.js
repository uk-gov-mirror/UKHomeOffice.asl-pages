const INITIAL_STATE = {};
const { merge } = require('lodash');

const content = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_CONTENT':
      return merge({}, state, { ...action.content });
  }
  return state;
};

module.exports = content;
