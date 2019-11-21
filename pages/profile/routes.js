const permission = require('./permission');
const invite = require('./invite');
const invitations = require('./invitations');
const read = require('./read');
const list = require('./list');
const { allowed } = require('../../lib/middleware');

module.exports = {
  list: {
    path: '',
    router: list
  },
  permission: {
    path: '/:profileId/permission',
    permissions: 'profile.permissions',
    before: allowed,
    router: permission
  },
  read: {
    path: '/:profileId',
    permissions: 'profile.read.basic',
    router: read
  },
  invite: {
    path: '/invite',
    permissions: 'profile.invite',
    router: invite
  },
  invitations: {
    path: '/invitations',
    router: invitations
  }
};
