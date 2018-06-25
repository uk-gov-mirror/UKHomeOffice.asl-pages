module.exports = {
  site: {
    required: 'Licensed premises all need a site name.'
  },
  name: {
    required: 'This could be a room number, like G1 for example.'
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
  declaration: {
    required: 'Check the declaration to confirm you have permission from the PEL holder.'
  }
};
