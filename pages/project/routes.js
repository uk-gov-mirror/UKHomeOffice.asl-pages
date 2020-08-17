const list = require('./list');
const importProject = require('./import');
const read = require('./read');
const updateLicenceHolder = require('./update-licence-holder');
const remove = require('./delete');
const revoke = require('./revoke');
const addUser = require('./add-user');
const removeUser = require('./remove-user');
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
  addUser: {
    path: '/:projectId/add-user',
    permissions: 'project.update',
    router: addUser
  },
  removeUser: {
    path: '/:projectId/remove-user',
    permissions: 'project.update',
    router: removeUser
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
