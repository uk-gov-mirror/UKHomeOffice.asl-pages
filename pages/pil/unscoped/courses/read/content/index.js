const { merge } = require('lodash');
const baseContent = require('../../create/content');
const status = require('../../../../../task/content/status');

module.exports = merge({}, baseContent, {
  title: 'Manage course participants',
  warning: 'Once you have applied for licences for this course, you will no longer be able to change these details.',
  coursePurposeRequiredWarning: 'You need to tell us the course purpose before adding participants.',
  participants: {
    title: 'Course participants',
    subtitle: 'Licences will be valid for 3 months from the date of approval.'
  },
  fields: {
    title: {
      label: 'Course title'
    },
    profile: {
      label: 'Name'
    },
    status: {
      label: 'Status'
    },
    details: {
      label: 'Details'
    },
    actions: {
      label: 'Actions'
    }
  },
  buttons: {
    edit: 'Edit course details',
    delete: 'Delete course',
    apply: 'Apply for a licence'
  },
  notifications: {
    deleted: 'Training course deleted successfully.'
  },
  status
});
