import React from 'react';
import format from 'date-fns/format';
import { Link } from '@asl/components';
import { dateFormat } from '../../../../../constants';

export default {
  licenceNumber: {
    format: (val, pil) => {
      return <Link page="pil.read" pilId={pil.id} profileId={pil.profile.id} label={val} establishmentId={pil.establishment.id} />;
    }
  },
  issueDate: {
    format: val => format(val, dateFormat.medium)
  },
  revocationDate: {
    format: val => val ? format(val, dateFormat.medium) : '-'
  },
  billable: {
    format: val => val ? <label className="badge blue">Billable</label> : <label className="badge">Not billable</label>
  }
};
