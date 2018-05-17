const url = (state = '', action) => {
  switch (action.type) {
    case 'SET_URL':
      return action.url;
  }
  return state;
};

module.exports = url;
