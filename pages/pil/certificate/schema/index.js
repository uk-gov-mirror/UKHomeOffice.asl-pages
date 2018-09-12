const { accreditationBodies } = require('../../../../constants');
// const DATE_REGEX = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

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
      }
    ]
  },
  dateAwarded: {
    inputType: 'dateInput'
    // ,
    // validate: [
    //   'required',
    //   {
    //     match: DATE_REGEX
    //   }
    // ]
  }
};
