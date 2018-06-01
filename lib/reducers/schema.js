const INITIAL_STATE = {};

const schema = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_SCHEMA':
      return {
        ...action.schema
      };
  }
  return state;
};

module.exports = schema;
