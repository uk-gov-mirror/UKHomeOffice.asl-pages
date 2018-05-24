const INITIAL_STATE = {};

const establishment = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_ESTABLISHMENT':
      let licenceHolder;
      if (action.establishment.pelh) {
        licenceHolder = action.establishment.pelh;
      } else if (Array.isArray(action.establishment.roles)) {
        licenceHolder = action.establishment.roles.find(r => r.type === 'pelh' || r.type === 'elh');
      }
      return { ...action.establishment, licenceHolder };
  }
  return state;
};

module.exports = establishment;
