import React from 'react';
import { useSelector } from 'react-redux';
import {
  Snippet,
  Datatable,
  Link
} from '@asl/components';
import format from 'date-fns/format';
import { dateFormat } from '../../../../../constants';
import Layout from '../../views';
import ExpandableRow from './row';

const formatters = {
  licenceNumber: {
    format: (val, pil) => {
      return <Link page="pil.read" pilId={pil.id} profileId={pil.profile.id} label={val} />;
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

export default function PersonalLicences() {
  const allowedActions = useSelector(state => state.static.allowedActions);

  return (
    <Layout tab={1}>
      <h2><Snippet>title</Snippet></h2>
      <Datatable className="licence-fees-pils" formatters={formatters} Expandable={allowedActions.includes('pil.updateBillable') && ExpandableRow} />
    </Layout>
  );
}
