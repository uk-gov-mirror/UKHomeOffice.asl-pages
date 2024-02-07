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
    nonRemovable: `You cannot remove {{profile.firstName}} {{profile.lastName}} from {{establishment.name}} because:

{{#hasProjects}}* they hold one or more project licences here - licences must be revoked or transferred first{{/hasProjects}}
{{#hasPil}}* they hold a personal licence here - licences must be revoked or transferred first{{/hasPil}}
{{#hasRoles}}* they hold one or more named roles here - roles must be reassigned first{{/hasRoles}}
{{#hasAdditionalProjects}}* they hold one or more projects with additional availability here - additional availability must be removed first{{/hasAdditionalProjects}}`,
    warning: `If you remove this person from this establishment, they will no longer be able to view any of this
establishment's data.`
  },
  notifications: {
    changed: 'Permission level changed',
    removed: 'Permissions removed'
  }
});
