const INITIAL_STATE = {
  name: '',
  id: null
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        id: action.id,
        name: action.name
      };
  }
  return state;
};

module.exports = user;
