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
  title: 'Change permission level',
  remove: {
    title: 'Remove permissions for this establishment',
    warning: `If you remove the user from this establishment they will no longer be able to view any of this
      establishment's data.`,
    nonRemovable: `This user can not be removed because they hold current active licences or a position of responsibility
      in this establishment. If you wish to remove this user from your establishment, you need to revoke their licences or
      reassign their areas of responsibility.`
  },
  notifications: {
    changed: 'Permission level changed',
    removed: 'Permissions removed'
  }
});
