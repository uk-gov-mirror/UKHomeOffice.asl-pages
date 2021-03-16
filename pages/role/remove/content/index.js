const { merge } = require('lodash');
const baseContent = require('../../../profile/content');
const namedRoles = require('../../content/named-roles');

module.exports = merge({}, baseContent, {
  title: 'Remove role',
  openTasks: {
    title: 'Role removals in progress',
    description: {
      single: 'There is already a request to remove the following role:',
      multiple: 'There are already requests to remove the following roles:'
    },
    link: 'View task'
  },
  fields: {
    type: {
      label: 'Confirm the role you want to remove',
      options: namedRoles
    },
    comment: {
      label: 'Why are you removing this role?'
    }
  },
  buttons: {
    submit: 'Continue'
  },
  errors: {
    type: {
      required: 'Please select a role'
    }
  }
});
