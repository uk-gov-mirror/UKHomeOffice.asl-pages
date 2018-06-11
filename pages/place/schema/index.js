const { suitabilityCodes, holdingCodes } = require('../../../constants');

module.exports = {
  site: {
    inputType: 'inputText',
    validate: [
      'required'
    ]
  },
  area: {
    inputType: 'inputText'
  },
  name: {
    inputType: 'inputText',
    validate: [
      'required'
    ]
  },
  suitability: {
    inputType: 'checkboxGroup',
    options: suitabilityCodes,
    validate: [
      'required',
      {
        definedValues: suitabilityCodes
      }
    ]
  },
  holding: {
    inputType: 'checkboxGroup',
    options: holdingCodes,
    validate: [
      'required',
      {
        definedValues: holdingCodes
      }
    ]
  },
  nacwo: {
    inputType: 'select'
  }
};
