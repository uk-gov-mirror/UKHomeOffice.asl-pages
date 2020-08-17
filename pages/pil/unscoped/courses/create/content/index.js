const { merge } = require('lodash');
const baseContent = require('../../content');

module.exports = merge({}, baseContent, {
  title: 'Create new course',
  buttons: {
    submit: 'Continue',
    cancel: 'Cancel'
  }
});
