const revoke = require('./revoke');
const update = require('./update');
const remove = require('./delete');
const pdf = require('./pdf');
const read = require('./read');
const create = require('./create');
const review = require('./review');

module.exports = {
  create: {
    path: '/create',
    permissions: 'pil.create',
    router: create
  },
  revoke: {
    path: '/:pilId/revoke',
    // TODO: add revoke permission
    permissions: 'pil.update',
    router: revoke
  },
  update: {
    path: '/:pilId/edit',
    permissions: 'pil.update',
    breadcrumb: false,
    router: update
  },
  review: {
    path: '/:pilId/review',
    breadcrumb: false,
    router: review
  },
  delete: {
    path: '/:pilId/delete',
    permissions: 'pil.delete',
    router: remove
  },
  pdf: {
    path: '/pdf',
    permissions: 'pil.pdf',
    router: pdf
  },
  read: {
    path: '/',
    permissions: 'pil.readCombinedPil',
    router: read
  }
};
