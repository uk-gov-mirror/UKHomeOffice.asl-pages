const list = require('./list');
const importProject = require('./import');
const read = require('./read');
const updateLicenceHolder = require('./update-licence-holder');
const remove = require('./delete');
const revoke = require('./revoke');

module.exports = {
  list: {
    path: '',
    router: list
  },
  import: {
    path: '/import',
    permissions: 'project.apply',
    router: importProject
  },
  read: {
    path: '/:projectId',
    permissions: 'project.read.single',
    router: read
  },
  updateLicenceHolder: {
    path: '/:projectId/update-licence-holder',
    permissions: 'project.update',
    router: updateLicenceHolder
  },
  delete: {
    path: '/:projectId/delete',
    permissions: 'project.delete',
    router: remove
  },
  revoke: {
    path: '/:projectId/revoke',
    permissions: 'project.revoke',
    router: revoke
  }
};
