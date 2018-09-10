const EXEMPT_OPTIONS = ['Yes', 'No'];

module.exports = {
  fields: {
    modules: {
      label: '[An example or examples of a module exemption]'
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
  pil: {
    exemptions: {
      title: 'Are there any training modules that you should be exempt from ?',
      more: 'More guidance on exemptions'
    }
  }
};
