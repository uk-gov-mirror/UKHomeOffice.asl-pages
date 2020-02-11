module.exports = {
  licenceNumber: {
    inputType: 'inputText',
    validate: 'required'
  },
  issueDate: {
    inputType: 'inputDate',
    validate: [
      'required',
      'validDate',
      'dateIsBefore'
    ]
  }
}
