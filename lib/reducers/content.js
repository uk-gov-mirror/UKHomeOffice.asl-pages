const INITIAL_STATE = {};

const content = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_CONTENT':
      return {
        ...action.content
      };
  }
  return state;
};

module.exports = content;
