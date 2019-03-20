const { merge } = require('lodash');
const baseContent = require('./');

module.exports = merge({}, baseContent, {
  title: 'Do you have any training certificates?',
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
