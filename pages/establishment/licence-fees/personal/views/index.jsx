import React from 'react';
import {
  Snippet,
  Datatable,
  Link
} from '@asl/components';
import format from 'date-fns/format';
import { dateFormat } from '../../../../../constants';
import Layout from '../../views';

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
  }
};

export default function PersonalLicences() {
  return (
    <Layout tab={1}>
      <h2><Snippet>title</Snippet></h2>
      <Datatable formatters={formatters} />
    </Layout>
  );
}
