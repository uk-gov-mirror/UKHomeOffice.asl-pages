const { moduleCodes } = require('@asl/constants');
const { toArray } = require('../../../../lib/utils');
const content = require('../content/modules');
const { species } = require('@asl/constants');
// TODO rename and put where ?
const SPECIES_REVEAL_TOTAL_COUNT = 10;

const options = moduleCodes.map(module => {
  return {
    label: module,
    value: module,
    species: Array(SPECIES_REVEAL_TOTAL_COUNT).fill({
      inputType: 'select',
      options: species,
      label: content.fields.species.label
    })
  };
});

module.exports = {
  modules: {
    inputType: 'checkboxGroup',
    options,
    format: toArray,
    nullValue: [],
    validate: [
      'required',
      {
        definedValues: moduleCodes
      }
    ]
  }
};
