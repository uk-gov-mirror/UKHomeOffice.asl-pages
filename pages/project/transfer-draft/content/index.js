module.exports = {
  title: 'Change the primary establishment of this project',
  fields: {
    primaryEstablishment: {
      label: 'What is the primary establishment for this project?',
      hint: {
        summary: 'Help if your establishment\'s not listed',
        details: `You need to be invited to an establishment before you can make them your primary establishment.
Ask the Home Office Liaison Contact (HOLC) at your chosen establishment to send you an invitation.`
      }
    }
  },
  buttons: {
    submit: 'Continue'
  },
  errors: {
    primaryEstablishment: {
      required: 'Please select a primary establishment',
      definedValues: 'Please select a primary establishment',
      customValidate: 'Please select a different primary establishment'
    }
  }
};
