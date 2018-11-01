const { merge } = require('lodash');
const baseContent = require('./');

module.exports = merge({}, baseContent, {
  title: 'Do you have any certificates to add?',
  fields: {
    exempt: {
      label: ''
    }
  },
  errors: {
    exempt: {
      required: 'You need to select yes or no.'
    }
  }
});
