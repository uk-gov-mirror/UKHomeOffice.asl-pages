const { accreditingBodies } = require('@ukhomeoffice/asl-constants');

module.exports = {
  certificateNumber: {
    inputType: 'inputText',
    validate: [
      'required'
    ]
  },
  accreditingBody: {
    inputType: 'radioGroup',
    automapReveals: true,
    options: accreditingBodies.map(name => {
      return {
        label: name,
        value: name,
        reveal: name === 'Other' ? {
          otherAccreditingBody: {
            inputType: 'inputText',
            label: 'If other, please specify',
            validate: 'required'
          }
        } : null
      };
    }),
    validate: [
      'required',
      {
        definedValues: accreditingBodies
      }
    ]
  },
  passDate: {
    inputType: 'inputDate',
    hint: 'For example, 20/8/2020. Certificates must have been awarded in the last 5 years.',
    nullValue: '',
    validate: [
      'required',
      'validDate',
      { dateIsBefore: 'now' }
    ]
  }
};
