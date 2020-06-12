const { merge } = require('lodash');
const profileContent = require('../../profile/read/content');
const pilContent = require('../../task/read/content/pil');
const tasklistContent = require('../../task/list/content');

module.exports = merge({}, pilContent, profileContent, tasklistContent, {
  establishment: {
    link: 'About this establishment'
  },
  notifications: {
    success: 'Changes saved!'
  },
  pil: {
    training: {
      title: 'Training'
    }
  },
  asru: {
    roles: {
      title: 'Roles',
      asruLicensing: 'Licensing officer',
      asruInspector: 'Inspector'
    }
  }
});
