const { toArray } = require('../../../../lib/utils');

module.exports = {
  species: {
    inputType: 'speciesSelector',
    format: toArray,
    nullValue: [],
    validate: [
      'required'
    ]
  }
};
