const { merge } = require('lodash');
const baseContent = require('../../content');

module.exports = merge({}, baseContent, {
  fields: {
    role: {
      label: ''
    }
  },
  buttons: {
    submit: 'Save',
    remove: 'Remove'
  },
  title: 'Update permissions',
  remove: {
    title: 'Remove permissions',
    warning: `If you remove this person from this establishment, they will no longer be able to view any of this
      establishment's data.`,
    nonRemovable: `This person currently holds an active licence or a position of responsibility in this establishment. To remove them from your establishment, you should revoke their licences or
      reassign their areas of responsibility.`
  },
  notifications: {
    changed: 'Permission level changed',
    removed: 'Permissions removed'
  }
});
