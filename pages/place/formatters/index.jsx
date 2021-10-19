import React, { Fragment } from 'react';
import { joinAcronyms, labelFromCode } from '../../common/formatters';

const byLastName = (roleA, roleB) => {
  return roleA.profile.lastName < roleB.profile.lastName ? -1 : 1;
};

export default {
  suitability: {
    format: joinAcronyms,
    mapOptions: labelFromCode
  },
  holding: {
    format: joinAcronyms,
    mapOptions: labelFromCode
  },
  restrictions: {
    format: restrictions => {
      return restrictions
        ? <Fragment><i className="icon icon-information" />{restrictions}</Fragment>
        : 'No restrictions';
    }
  },
  nacwos: {
    format: nacwos => {
      return nacwos ? nacwos.sort(byLastName).map(r => `${r.profile.firstName} ${r.profile.lastName}`).join(', ') : '-';
    },
    accessor: 'id'
  },
  nvssqps: {
    format: nvssqps => {
      return nvssqps ? nvssqps.sort(byLastName).map(r => `${r.profile.firstName} ${r.profile.lastName}`).join(', ') : '-';
    },
    accessor: 'id'
  }
};
