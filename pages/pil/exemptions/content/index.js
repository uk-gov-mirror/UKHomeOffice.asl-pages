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
  errors: {
    certificateNumber: {
      required: 'You need to enter a certificate number'
    },
    accreditationBody: {
      required: 'You need to chose an accreditation body.'
    },
    dateAwarded: {
      required: 'You need to enter the date when the certificate was awarded.'
    }
  },
  pil: {
    exemptions: {
      title: 'Are there any training modules that you should be exempt from ?',
      more: 'More guidance on exemptions'
    }
  }
};
