const { merge } = require('lodash');

const fields = {
  site: {
    label: 'Site'
  },
  area: {
    label: 'Area'
  },
  name: {
    label: 'Name'
  },
  suitability: {
    label: 'Suitability'
  },
  holding: {
    label: 'Holding'
  },
  nacwo: {
    label: 'NACWO'
  }
};

module.exports = (formatters = {}) => merge({}, fields, formatters);
