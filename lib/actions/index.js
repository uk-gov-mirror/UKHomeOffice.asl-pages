const fetch = require('r2');
const { merge } = require('lodash');
const { queryStringFromState, getSort } = require('../utils');

const FETCH_TIMEOUT = 5000;

const setSort = sort => ({
  type: 'SET_SORT',
  sort
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

const requestItems = () => ({
  type: 'REQUEST_ITEMS'
});

const receiveItems = ({ rows, count, totalCount }) => ({
  type: 'RECEIVE_ITEMS',
  rows,
  count,
  totalCount
});

const requestFailed = () => ({
  type: 'REQUEST_FAILED'
});

const setPage = page => ({
  type: 'SET_PAGE',
  page
});

const fetchItems = (url, dispatch) => {
  dispatch(requestItems());
  return Promise.resolve()
    .then(() => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('Request timed out'));
        }, FETCH_TIMEOUT);

        fetch(url, {
          credentials: 'include',
          headers: {
            Accept: 'application/json'
          }
        })
          .json
          .then(resolve, reject);
      });
    })
    .then(({ datatable: { data: { rows }, pagination: { count, totalCount } } }) => {
      dispatch(receiveItems({ rows, count, totalCount }));
    })
    .catch(err => {
      dispatch(requestFailed(err));
    });
};

const doSort = column => (dispatch, getState) => {
  const state = getState();
  const sort = getSort(column, state.datatable.sort);
  const query = queryStringFromState(merge({}, state, {
    datatable: { sort }
  }));
  return fetchItems(`${state.static.url}?${query}`, dispatch)
    .then(() => dispatch(setSort(sort)));
};

const changePage = page => (dispatch, getState) => {
  const state = getState();
  const query = queryStringFromState(merge({}, state, {
    datatable: { pagination: { page } }
  }));
  return fetchItems(`${state.static.url}?${query}`, dispatch)
    .then(() => dispatch(setPage(page)));
};

const changeFilters = filters => (dispatch, getState) => {
  const state = getState();
  const query = queryStringFromState(merge({}, state, {
    datatable: { filters: { active: filters } }
  }));
  return fetchItems(`${state.static.url}?${query}`, dispatch)
    .then(() => dispatch(setFilters(filters)));
};

const doSearch = search => (dispatch, getState) => {
  const state = getState();
  const query = queryStringFromState(merge({}, state, {
    datatable: { filters: { active: { '*': search } } }
  }));
  return fetchItems(`${state.static.url}?${query}`, dispatch)
    .then(() => dispatch(setFilter('*', search)));
};

const clickLinkFilter = (column, filter) => (dispatch, getState) => {
  const state = getState();
  const query = queryStringFromState(merge({}, state, {
    datatable: { filters: { active: { [column]: [filter] } } }
  }));
  return fetchItems(`${state.static.url}?${query}`, dispatch)
    .then(() => dispatch(setFilter(column, filter)));
};

module.exports = {
  doSort,
  changeFilters,
  doSearch,
  clickLinkFilter,
  changePage
};
