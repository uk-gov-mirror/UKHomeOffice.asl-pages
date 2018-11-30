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
  copy: 'If you remove the user from this establishment they will no longer be able to view any of this establishment\'s data and all currently held licenses will need to either be transferred to another establishment or put on hold'
});
