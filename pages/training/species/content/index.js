const { merge } = require('lodash');
const baseContent = require('../../content');

module.exports = merge({}, baseContent, {
  title: 'Which animal types are covered by the {{#isExemption}}exemption{{/isExemption}}{{^isExemption}}certificate{{/isExemption}}?',
  fields: {
    species: {
      label: 'Animal types'
    }
  },
  errors: {
    species: {
      required: 'Select the animal types'
    }
  }
});
