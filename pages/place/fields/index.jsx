import { merge } from 'lodash';

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

export default (formatters = {}) => merge({}, fields, formatters);
