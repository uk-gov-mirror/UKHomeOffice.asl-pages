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
  email: {
    inputType: 'inputText',
    validate: [
      'required',
      {
        customValidate: email => /^\S+@\S+$/.test(email)
      }
    ]
  },
  dob: {
    inputType: 'inputDate',
    validate: [
      'required',
      { dateIsBefore: 'now' }
    ]
  },
  trainingNeed: {
    inputType: 'textarea',
    validate: [
      'required'
    ]
  }
};
