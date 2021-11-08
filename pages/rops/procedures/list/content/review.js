const { merge } = require('lodash');
const listContent = require('./index');

module.exports = merge({}, listContent, {
  pageTitle: 'Check your return',
  procedures: {
    title: 'Your procedures'
  },
  submit: {
    action: 'Continue'
  }
});
