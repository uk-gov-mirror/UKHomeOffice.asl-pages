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
  'manage-training': 'Manage training',
  asru: {
    title: 'Animals in Science Regulation Unit',
    roles: {
      title: {
        list: 'Roles'
      },
      asruLicensing: {
        label: 'Licensing officer',
        hint: 'Grant, amend and revoke licences'
      },
      asruInspector: {
        label: 'Inspector',
        hint: 'Specify additional conditions and authorisations and make licence recommendations'
      },
      none: '{{name}} hasn’t been assigned any roles.'
    }
  },
  profileMerge: {
    info: `wtf: {{wtf}}

    profileId: {{profileId}}

    url: {{url}}

    [{{label}}]({{url}})
    `
    // info: `This profile has been merged with another. If anything doesn't look right, check the other
    // merged profile for [{{label}}]({{url}}).`
  }
});
