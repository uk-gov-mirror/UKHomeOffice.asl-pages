const { merge } = require('lodash');
const content = require('./');

module.exports = merge({}, content, {
  title: 'Which modules did this certificate cover?',
  fields: {
    modules: {
      label: '',
      hint: 'Select all that apply.'
    },
    species: {
      label: 'Please specify a species.',
      add: 'Add another species'
    }
  },
  errors: {
    modules: {
      required: 'You need to select at least one module.'
    }
  }
});
