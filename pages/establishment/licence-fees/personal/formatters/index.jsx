import React from 'react';
import format from 'date-fns/format';
import { Link } from '@asl/components';
import { dateFormat } from '../../../../../constants';

export default {
  licenceNumber: {
    format: (val, pil) => {
      return <Link page="pil.read" pilId={pil.id} profileId={pil.profile.id} label={val} establishmentId={pil.establishmentId} />;
    }
  },
  issueDate: {
    format: val => format(val, dateFormat.medium)
  },
  revocationDate: {
    // TODO: we may want to separate revocation and transferred pils for clarity.
    format: (val, model) => {
      if (model.transfers.length) {
        return format(model.transfers[0].createdAt, dateFormat.medium);
      }
      return val ? format(val, dateFormat.medium) : '-';
    }
  },
  billable: {
    format: val => val ? <label className="badge blue">Billable</label> : <label className="badge">Not billable</label>
  }
};
