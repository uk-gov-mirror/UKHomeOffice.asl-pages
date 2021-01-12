module.exports = {
  title: 'Change PPL holder',
  currentLicenceHolder: 'Current PPL holder',
  fields: {
    licenceHolderId: {
      label: 'Proposed PPL holder',
      hint: 'If you cannot see the person you are looking for please contact an administrator at your establishment who can make this change for you.'
    },
    comments: {
      label: 'Why are you making this amendment?',
      hint: 'Comments can be seen by establishment users, as well as inspectors and Home Office team members.'
    }
  },
  errors: {
    licenceHolderId: {
      required: 'Select a new licence holder',
      definedValues: 'Select a licence holder from the list',
      customValidate: 'Select a new PPL holder'
    }
  },
  notifications: {
    success: 'Licence holder updated'
  },
  buttons: {
    submit: 'Continue'
  }
};
