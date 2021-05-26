const list = require('./list');
const importProject = require('./import');
const read = require('./read');
const updateLicenceHolder = require('./update-licence-holder');
const remove = require('./delete');
const revoke = require('./revoke');
const collaborators = require('./collaborators');
const transferDraft = require('./transfer-draft');

module.exports = {
  list: {
    path: '',
    router: list
  },
  import: {
    path: '/import',
    permissions: 'project.import',
    router: importProject
  },
  read: {
    path: '/:projectId',
    permissions: 'project.read.single',
    router: read
  },
  collaborators: {
    path: '/:projectId/collaborators',
    breadcrumb: false,
    permissions: 'project.manageAccess',
    router: collaborators
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
  },
  transferDraft: {
    path: '/:projectId/transfer-draft',
    permissions: 'project.transfer',
    router: transferDraft
  }
};
