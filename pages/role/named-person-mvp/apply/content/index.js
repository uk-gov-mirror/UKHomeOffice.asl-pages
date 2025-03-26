const { merge } = require('lodash');
const baseContent = require('../../../../profile/content');

module.exports = merge({}, baseContent, {
  title: 'Add role',
  openTasks: {
    title: 'Role assignments in progress',
    description: {
      single: 'There is already a request to add the following role:',
      multiple: 'There are already requests to add the following roles:'
    },
    link: 'View task'
  },
  fields: {
    type: {
      label: 'Which role do you want to add?'
    },
    rcvsNumber: {
      label: 'RCVS membership number'
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
