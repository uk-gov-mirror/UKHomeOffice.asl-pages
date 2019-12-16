const revoke = require('./revoke');
const update = require('./update');
const remove = require('./delete');
const pdf = require('./pdf');
const read = require('./read');
const create = require('./create');

module.exports = {
  read: {
    path: '/:pilId',
    permisions: 'pil.read',
    router: read
  },
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
  delete: {
    path: '/:pilId/delete',
    permissions: 'pil.delete',
    router: remove
  },
  pdf: {
    path: '/:pilId/pdf',
    permissions: 'pil.pdf',
    router: pdf
  }
};
