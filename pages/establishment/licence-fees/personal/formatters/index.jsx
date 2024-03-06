import React from 'react';
import { format } from 'date-fns';
import { Link } from '@ukhomeoffice/asl-components';
import { dateFormat } from '../../../../../constants';

export default {
  licenceHolder: {
    format: (val, pil) => `${pil.profile.firstName} ${pil.profile.lastName}`
  },
  licenceNumber: {
    format: (val, pil) => {
      if (!pil.profile.establishments.length) {
        return val;
      }
      return <Link page="pil.read" pilId={pil.id} profileId={pil.profile.id} label={val} />;
    }
  },
  startDate: {
    format: val => format(val, dateFormat.medium)
  },
  endDate: {
    format: val => val ? format(val, dateFormat.medium) : '-'
  },
  waived: {
    format: val => val === true ? <label className="badge">Not billable</label> : <label className="badge blue">Billable</label>
  }
};
