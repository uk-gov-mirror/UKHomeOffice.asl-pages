const INITIAL_STATE = {};

module.exports = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_PROFILE':
      return {
        ...action.profile
      };
  }
  return state;
};
