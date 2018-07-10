import React from 'react';
import { get } from 'lodash';
import { defineValue, joinAcronyms, labelFromCode } from '../../common/formatters';
import Link from '../../common/views/containers/link';

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
    format: val => val && <Link page="profile.view" profile={ get(val, 'profile.id') } label={ get(val, 'profile.name') } />,
    accessor: 'id'
  }
};
