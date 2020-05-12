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
  restrictions: {
    format: val => val || 'None'
  },
  nacwos: {
    format: nacwos => {
      return nacwos && nacwos.map(r => `${r.profile.firstName} ${r.profile.lastName}`).join(', ');
    },
    accessor: 'id'
  },
  nvssqps: {
    format: nvssqps => {
      return nvssqps && nvssqps.map(r => `${r.profile.firstName} ${r.profile.lastName}`).join(', ');
    },
    accessor: 'id'
  }
};
