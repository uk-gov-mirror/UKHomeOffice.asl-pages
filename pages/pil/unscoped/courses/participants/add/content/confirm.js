const { merge } = require('lodash');
const baseContent = require('./');
const trainingContent = require('../../../content');

module.exports = merge({}, trainingContent, baseContent, {
  title: 'Check licence details',
  fields: {
    title: {
      label: 'Course title'
    }
  },
  buttons: {
    submit: 'Send for endorsement',
    cancel: 'Edit'
  },
  notifications: {
    success: 'Licence request sent.'
  }
});
