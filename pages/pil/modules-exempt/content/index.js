module.exports = {
  fields: {
    modules: {
      label: ''
    },
    reason: {
      label: 'Reasons for exemption'
    }
  },
  buttons: {
    submit: 'Continue'
  },
  errors: {
    modules: {
      required: 'You need to select at least one module.'
    },
    reason: {
      customValidate: 'Please give a reason you are exempt from module {{meta}}'
    }
  },
  pil: {
    exemptions: {
      title: 'Which training modules do you think you should be exempt from?',
      hint: 'Exemptions from training modules will only be considered if your previous experience demonstrates that you have sufficient existing knowledge and the required level of competence.'
    }
  }
};
