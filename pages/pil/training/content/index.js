const { merge } = require('lodash');
const baseContent = require('../../content');

module.exports = merge({}, baseContent, {
  title: 'Training',
  intro: 'Applicants must confirm training requirements have been met. This could be through completed training modules or professional experience that makes training unnecessary.',
  'current-modules': 'Training record',
  buttons: {
    submit: 'Continue',
    back: 'List of sections'
  },
  fields: {
    update: {
      label: 'Do you need to update this training record?'
    }
  },
  errors: {
    update: {
      required: 'You need to confirm if your training modules are up to date.'
    }
  }
});
