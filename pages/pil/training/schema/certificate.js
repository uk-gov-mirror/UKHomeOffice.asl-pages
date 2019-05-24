const { accreditingBodies } = require('@asl/constants');
const moment = require('moment');

const accreditingBodyOptions = () => {
  return accreditingBodies.map(name => {
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
  });
};

module.exports = {
  certificateNumber: {
    inputType: 'inputText',
    validate: [
      'required'
    ]
  },
  accreditingBody: {
    inputType: 'radioGroup',
    options: accreditingBodyOptions(),
    validate: [
      'required',
      {
        definedValues: accreditingBodies
      }
    ]
  },
  passDate: {
    inputType: 'dateInput',
    hint: 'For example, 20.08.1980',
    validate: [
      'required',
      'validDate',
      { dateIsBefore: moment() }
    ]
  }
};
