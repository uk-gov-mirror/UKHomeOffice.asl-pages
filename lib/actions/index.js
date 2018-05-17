const setEstablishment = establishment => ({
  type: 'SET_ESTABLISHMENT',
  establishment
});

const setData = data => ({
  type: 'SET_DATA',
  data
});

const setSchema = schema => ({
  type: 'SET_SCHEMA',
  schema
});

const setUrl = url => ({
  type: 'SET_URL',
  url
});

module.exports = {
  setData,
  setSchema,
  setEstablishment,
  setUrl
};
