const read = require('./read');
const update = require('./update');
const remove = require('./delete');
const create = require('./create');
const list = require('./list');

module.exports = {
  list: {
    path: '',
    permissions: 'place.list',
    router: list
  },
  update: {
    path: '/:placeId/edit',
    permissions: 'place.update',
    router: update
  },
  delete: {
    path: '/:placeId/delete',
    permissions: 'place.delete',
    router: remove
  },
  create: {
    path: '/create',
    permissions: 'place.create',
    router: create
  },
  read: {
    path: '/:placeId',
    permissions: 'place.read',
    router: read
  }
};
