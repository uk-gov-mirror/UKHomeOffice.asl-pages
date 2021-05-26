const create = require('./create');
const update = require('./update');

module.exports = {
  create: {
    path: '/new',
    permissions: 'project.manageAccess',
    router: create
  },
  update: {
    path: '/:profileId',
    permissions: 'project.manageAccess',
    router: update
  }
};
