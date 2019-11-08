const { merge } = require('lodash');
const baseContent = require('../../content');
const content = require('./');

module.exports = merge({}, baseContent, content, {
  title: 'Which training modules should the applicant be exempt from?',
  fields: {
    modules: {
      hint: 'Exemptions from training modules will only be considered if an applicant\'s previous experience demonstrates that they have sufficient existing knowledge and the required level of competence.',
      label: ''
    },
    reason: {
      label: 'Reasons for exemption'
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
    },
    reason: {
      customValidate: 'Enter a reason why an applicant should be exempt from module {{meta}}.'
    }
  }
});
