const { merge } = require('lodash');
const content = require('../../content');

module.exports = merge({}, content, {
  title: 'Which modules did this certificate cover?',
  fields: {
    modules: {
      label: '',
      hint: 'Select all that apply.'
    },
    species: {
      label: 'Please specify a type of animal.',
      add: 'Add another',
      remove: 'Remove'
    },
    other: {
      label: 'Which other type?'
    }
  },
  errors: {
    modules: {
      required: 'You need to select at least one module.'
    }
  }
});
