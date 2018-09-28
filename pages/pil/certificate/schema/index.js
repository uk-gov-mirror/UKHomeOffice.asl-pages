const { accreditingBodies } = require('@asl/constants');
const moment = require('moment');

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
    validate: [
      'required',
      {
        definedValues: accreditingBodies
      }
    ]
  },
  pass_date: {
    inputType: 'dateInput',
    hint: 'For example, 20.08.1980',
    validate: [
      'required',
      'validDate',
      { dateIsBefore: moment() }
    ]
  }
};
