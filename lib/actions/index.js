const setEstablishment = establishment => ({
  type: 'SET_ESTABLISHMENT',
  establishment
});

const setData = data => ({
  type: 'SET_DATA',
  data
});

const setUrl = url => ({
  type: 'SET_URL',
  url
});

module.exports = {
  setData,
  setEstablishment,
  setUrl
};
