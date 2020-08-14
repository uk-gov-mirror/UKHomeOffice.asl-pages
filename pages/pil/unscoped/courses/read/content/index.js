const { merge } = require('lodash');
const baseContent = require('../../create/content');

module.exports = merge({}, baseContent, {
  title: 'Manage course participants',
  warning: 'Once you have applied for licences for this course, you will no longer be able to change these details.',
  buttons: {
    edit: 'Edit'
  }
});
