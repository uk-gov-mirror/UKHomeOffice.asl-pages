const EXEMPT_OPTIONS = ['Yes', 'No'];

module.exports = {
  fields: {
    modules: {
      label: 'Exemptions from training modules will only be considered if your previous experience demonstrates that you have sufficient existing knowledge and the required level of competence.'
    },
    exempt: {
      label: ''
    }

  },
  exempt: {
    inputType: 'radioGroup',
    validate: [
      'required',
      {
        definedValues: EXEMPT_OPTIONS
      }
    ],
    options: EXEMPT_OPTIONS
  },
  buttons: {
    submit: 'Continue'
  },
  errors: {
    modules: {
      required: 'You need to select yes or no.'
    }
  },
  pil: {
    exemptions: {
      title: 'Are there any training modules that you should be exempt from ?',
      more: 'More guidance on exemptions'
    }
  }
};
