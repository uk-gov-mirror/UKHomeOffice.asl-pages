const INTIIAL_STATE = {};

const diff = (state = INTIIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_DIFF':
      return {
        ...action.diff
      };
  }
  return state;
};

module.exports = diff;
