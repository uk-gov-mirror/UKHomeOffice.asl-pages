const { merge } = require('lodash');
const profileContent = require('../../profile/read/content');
const pilContent = require('../../task/read/content/pil');
const tasklistContent = require('../../task/list/content');

module.exports = merge({}, pilContent, profileContent, tasklistContent, {
  establishment: {
    link: 'About this establishment'
  },
  pil: {
    training: {
      title: 'Training'
    }
  },
  asru: {
    title: 'ASRU',
    roles: {
      title: 'Roles',
      asruLicensing: 'Licensing officer',
      asruInspector: 'Inspector'
    }
  }
});
