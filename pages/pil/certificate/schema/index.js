const { accreditingBodies } = require('@asl/constants');

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
  dateAwarded: {
    inputType: 'dateInput',
    hint: 'For example, 20.08.1980'
  }
};
