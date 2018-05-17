const url = (state = '', action) => {
  switch (action.type) {
    case 'SET_URL':
      console.log('setting url', action.url);
      return action.url;
  }
  return state;
};

module.exports = url;
