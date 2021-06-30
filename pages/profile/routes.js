const permission = require('./permission');
const invite = require('./invite');
const invitations = require('./invitations');
const read = require('./read');
const list = require('./list');
const convertLegacyProject = require('./convert-legacy-project');
const remove = require('./remove');
const { allowed } = require('../../lib/middleware');

module.exports = {
  list: {
    path: '',
    router: list
  },
  read: {
    path: '/:profileId',
    permissions: 'profile.read.basic',
    router: read
  },
  remove: {
    path: '/:profileId/remove',
    router: remove
  },
  permission: {
    path: '/:profileId/permission',
    permissions: 'profile.permissions',
    before: allowed,
    router: permission
  },
  convertLegacyProject: {
    path: '/:profileId/convert-legacy-project',
    permissions: 'project.stub.create',
    router: convertLegacyProject
  },
  invite: {
    path: '/invite',
    permissions: 'profile.invite',
    router: invite
  },
  invitations: {
    path: '/invitations',
    permissions: 'profile.invite',
    router: invitations
  }
};
