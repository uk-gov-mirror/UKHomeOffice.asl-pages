const { accreditingBodies } = require('@asl/constants');

module.exports = {
  certificateNumber: {
    inputType: 'inputText',
    validate: [
      'required'
    ]
  },
  accreditingBody: {
    inputType: 'radioGroup',
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
    hint: 'For example, 20/08/2018',
    nullValue: '',
    validate: [
      'required',
      'validDate',
      { dateIsBefore: 'now' }
    ]
  }
};
