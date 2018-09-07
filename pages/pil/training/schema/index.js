const { accreditationBodies } = require('../../../../constants');

module.exports = {
  certificateNumber: {
    inputType: 'inputText',
    validate: [
      'required'
    ]
  },
  accreditationBody: {
    inputType: 'select',
    options: accreditationBodies,
    accessor: 'id',
    validate: ['required',
      {
        definedValues: accreditationBodies
      }]
  },
  dateAwarded: {
    inputType: 'dateInput',
    validate: [
      'required'
      // ,
      // {
      //   match: DATE_REGEX
      // }
    ]
  }
};
