const create = require('./create');
const update = require('./update');
const list = require('./list');

module.exports = {
  list: {
    path: '/',
    breadcrumb: false,
    router: list
  },
  review: {
    path: '/review',
    breadcrumb: false,
    router: list
  },
  create: {
    path: '/create',
    breadcrumb: false,
    router: create
  },
  update: {
    path: '/:procedureId',
    breadcrumb: false,
    router: update
  }
};
