const { merge } = require('lodash');
const content = require('./');

module.exports = merge({}, content, {
  title: 'Which training modules do you think you should be exempt from?',
  fields: {
    modules: {
      hint: 'Exemptions from training modules will only be considered if your previous experience demonstrates that you have sufficient existing knowledge and the required level of competence.',
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
      customValidate: 'Please give a reason you are exempt from module {{meta}}'
    }
  }
})
