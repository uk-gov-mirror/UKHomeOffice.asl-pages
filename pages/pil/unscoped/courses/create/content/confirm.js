const { merge } = require('lodash');
const baseContent = require('../../content');

module.exports = merge({}, baseContent, {
  title: 'Check course details',
  buttons: {
    submit: 'Confirm and continue',
    cancel: 'Edit course details'
  },
  notifications: {
    success: 'Training course created successfully.'
  }
});
