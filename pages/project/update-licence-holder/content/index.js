module.exports = {
  title: 'Change PPL holder',
  currentLicenceHolder: 'Current PPL holder',
  fields: {
    licenceHolderId: {
      label: 'New PPL holder'
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
  }
};
