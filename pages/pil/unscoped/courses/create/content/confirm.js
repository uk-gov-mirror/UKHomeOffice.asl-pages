const { merge } = require('lodash');
const baseContent = require('../../content');

module.exports = merge({}, baseContent, {
  title: 'Check course details',
  buttons: {
    submit: 'Confirm and continue'
  },
  notifications: {
    success: 'Training course created successfully.'
  }
});
