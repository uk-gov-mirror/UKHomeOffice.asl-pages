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

const setSortColumn = column => ({
  type: 'SET_SORT_COLUMN',
  column
});

const setSort = sort => ({
  type: 'SET_SORT',
  sort
});

const setUrl = url => ({
  type: 'SET_URL',
  url
});

const setProfile = profile => ({
  type: 'SET_PROFILE',
  profile
});

const setFilters = filters => ({
  type: 'SET_FILTERS',
  filters
});

const setFilter = (key, value) => ({
  type: 'SET_FILTER',
  key,
  value
});

const setContent = content => ({
  type: 'SET_CONTENT',
  content
});

module.exports = {
  setData,
  setSchema,
  setEstablishment,
  setUrl,
  setProfile,
  setSortColumn,
  setSort,
  setFilters,
  setFilter,
  setContent
};
