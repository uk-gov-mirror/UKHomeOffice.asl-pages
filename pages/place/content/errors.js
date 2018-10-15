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
    required: 'Describe the changes you would like to make to the restrictions.'
  },
  declaration: {
    required: 'Check the declaration to confirm you have permission from the PEL holder.'
  }
};
