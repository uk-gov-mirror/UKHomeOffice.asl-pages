import React, { Fragment } from 'react';
import { joinAcronyms, labelFromCode } from '../../common/formatters';

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
      return nacwos ? nacwos.map(r => `${r.profile.firstName} ${r.profile.lastName}`).join(', ') : '-';
    },
    accessor: 'id'
  },
  nvssqps: {
    format: nvssqps => {
      return nvssqps ? nvssqps.map(r => `${r.profile.firstName} ${r.profile.lastName}`).join(', ') : '-';
    },
    accessor: 'id'
  }
};
