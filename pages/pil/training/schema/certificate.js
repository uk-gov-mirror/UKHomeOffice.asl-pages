const { accreditingBodies } = require('@asl/constants');
const moment = require('moment');

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
    inputType: 'dateInput',
    hint: 'For example, 20/08/2018',
    validate: [
      'required',
      'validDate',
      { dateIsBefore: moment() }
    ]
  }
};
