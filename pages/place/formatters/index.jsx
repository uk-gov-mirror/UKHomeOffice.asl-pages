import { defineValue, joinAcronyms, labelFromCode } from '../../common/formatters';

export default {
  suitability: {
    format: joinAcronyms,
    label: defineValue,
    mapOptions: labelFromCode
  },
  holding: {
    format: joinAcronyms,
    label: defineValue,
    mapOptions: labelFromCode
  },
  nacwo: {
    format: val => val && `${val.firstName} ${val.lastName}`,
    accessor: 'id'
  }
};
