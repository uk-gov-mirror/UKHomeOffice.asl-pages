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
    inputType: 'select',
    options: accreditingBodies,
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
