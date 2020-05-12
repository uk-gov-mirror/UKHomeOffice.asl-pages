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
  nacwos: {
    required: 'Select a NACWO.',
    definedValues: 'Invalid option, select from the list of available NACWOs.'
  },
  nvssqps: {
    required: 'Select an NVS / SQP.',
    definedValues: 'Invalid option, select from the list of available NVS / SQPs.'
  },
  changesToRestrictions: {
    required: 'Describe the changes you would like to make to the restrictions.',
    customValidate: 'Describe the changes you would like to make to the restrictions.'
  }
};
