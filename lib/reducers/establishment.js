const INITIAL_STATE = {};

const establishment = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_ESTABLISHMENT':
      return { ...action.establishment };
  }
  return state;
};

module.exports = establishment;
