const permissions = require('@asl/service/lib/middleware/permissions');
const list = require('./list');
const importProject = require('./import');
const read = require('./read');
const updateLicenceHolder = require('./update-licence-holder');
const remove = require('./delete');
const revoke = require('./revoke');

const projectPermissions = task => (req, res, next) => {
  const params = {
    id: req.projectId,
    licenceHolderId: req.project && req.project.licenceHolderId,
    establishment: req.establishment.id
  };
  permissions(task, params)(req, res, next);
};

module.exports = {
  list: {
    path: '',
    router: list
  },
  import: {
    path: '/import',
    permissions: projectPermissions('project.apply'),
    router: importProject
  },
  read: {
    path: '/:projectId',
    permissions: projectPermissions('project.read.single'),
    router: read
  },
  updateLicenceHolder: {
    path: '/:projectId/update-licence-holder',
    permissions: projectPermissions('project.update'),
    router: updateLicenceHolder
  },
  delete: {
    path: '/:projectId/delete',
    permissions: projectPermissions('project.delete'),
    router: remove
  },
  revoke: {
    path: '/:projectId/revoke',
    permissions: projectPermissions('project.revoke'),
    router: revoke
  }
};
