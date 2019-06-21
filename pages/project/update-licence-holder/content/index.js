module.exports = {
  title: 'Change PPL holder',
  fields: {
    licenceHolder: {
      label: 'Licence holder'
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
