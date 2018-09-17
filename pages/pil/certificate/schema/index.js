const { accreditingBodies } = require('../../../../constants');
// const DATE_REGEX = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

module.exports = {
  certificate_number: {
    inputType: 'inputText',
    validate: [
      'required'
    ]
  },
  accrediting_body: {
    inputType: 'select',
    options: accreditingBodies,
    accessor: 'id',
    validate: ['required',
      {
        definedValues: accreditingBodies
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
