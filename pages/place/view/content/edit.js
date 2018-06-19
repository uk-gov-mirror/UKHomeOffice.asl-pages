const { merge } = require('lodash');
const commonContent = require('../../content');

module.exports = merge({}, commonContent, {
  inset: 'Any changes to suitability or holding codes will need to be assessed.',
  errors: {
    site: {
      required: 'Enter a site for the licensed premises'
    },
    name: {
      required: 'Add a name for the licensed premises'
    },
    holding: {
      required: 'Select applicable holding code(s)',
      definedValues: 'Invalid option, select from the list of available holding codes'
    },
    suitability: {
      required: 'Select applicable suitability code(s)',
      definedValues: 'Invalid option, select from the list of available suitability codes'
    },
    nacwo: {
      required: 'Select a NACWO for the licensed premises',
      definedValues: 'Invalid option, select from the list of available NACWOs'
    }
  }
});
