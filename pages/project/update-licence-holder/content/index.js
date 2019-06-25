module.exports = {
  title: 'Change PPL holder',
  currentLicenceHolder: 'Current PPL holder',
  fields: {
    licenceHolder: {
      label: 'New PPL holder'
    },
    comments: {
      label: 'Why are you making this amendment'
    }
  },
  errors: {
    licenceHolder: {
      required: 'Select a new licence holder',
      definedValues: 'Select a licence holder from the list',
      customValidate: 'Select a new PPL holder'
    }
  }
};
