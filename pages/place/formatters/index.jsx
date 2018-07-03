import { get } from 'lodash';
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
    format: val => get(val, 'profile.name')
  }
};
