import React from 'react';
import format from 'date-fns/format';
import { Link } from '@asl/components';
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
      return <Link page="pil.read" pilId={pil.id} profileId={pil.profile.id} label={val} establishmentId={pil.establishmentId} />;
    }
  },
  startDate: {
    format: val => format(val, dateFormat.medium)
  },
  endDate: {
    format: val => val ? format(val, dateFormat.medium) : '-'
  },
  billable: {
    format: val => val !== false ? <label className="badge blue">Billable</label> : <label className="badge">Not billable</label>
  }
};
