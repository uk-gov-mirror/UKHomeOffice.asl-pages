module.exports = {
  site: {
    required: 'Select a site for this new approved area.'
  },
  name: {
    required: 'Enter a name for this approved area.'
  },
  holding: {
    required: 'Select at least one holding code.',
    definedValues: 'Invalid option, select from the list of available holding codes.'
  },
  suitability: {
    required: 'Select at least one suitability code.',
    definedValues: 'Invalid option, select from the list of available suitability codes.'
  },
  nacwo: {
    required: 'Select a NACWO.',
    definedValues: 'Invalid option, select from the list of available NACWOs.'
  },
  changesToRestrictions: {
    required: 'Describe the changes you would like to make to the restrictions.',
    customValidate: 'Describe the changes you would like to make to the restrictions.'
  },
  declarations: {
    required: 'Please confirm that you understand',
    customValidate: 'Please confirm that you understand'
  }
};
