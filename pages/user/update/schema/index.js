module.exports = {
  firstName: {
    inputType: 'inputText',
    validate: [
      'required'
    ]
  },
  lastName: {
    inputType: 'inputText',
    validate: [
      'required'
    ]
  },
  dob: {
    inputType: 'inputDate',
    validate: [
      'required',
      'validDate',
      { dateIsBefore: 'now' }
    ]
  },
  telephone: {
    inputType: 'inputText'
  },
  telephoneAlt: {
    inputType: 'inputText'
  },
  comments: {
    inputType: 'textarea'
  }
};
