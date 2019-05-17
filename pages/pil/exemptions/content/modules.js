const { merge } = require('lodash');
const content = require('./');

module.exports = merge({}, content, {
  title: 'Which training modules should the applicant be exempt from?',
  fields: {
    modules: {
      hint: 'Exemptions from training modules will only be considered if an applicant\'s previous experience demonstrates that they have sufficient existing knowledge and the required level of competence.',
      label: ''
    },
    reason: {
      label: 'Reasons for exemption'
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
