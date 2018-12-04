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
  remove: 'Remove permissions for this establishment',
  warning: 'If you remove the user from this establishment they will no longer be able to view any of this establishment\'s data.',
  copy: 'This user can not be removed because they hold current active licenses or position of responsibility in establishment.If you wish to remove this user from your establishment, you need to revoke their licenses or reassign their areas of responsibility.'
});
