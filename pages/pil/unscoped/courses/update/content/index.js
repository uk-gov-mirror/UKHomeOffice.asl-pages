const { merge } = require('lodash');
const baseContent = require('../../content');

module.exports = merge({}, baseContent, {
  title: 'Update course details',
  buttons: {
    submit: 'Continue',
    cancel: 'Cancel'
  }
});
