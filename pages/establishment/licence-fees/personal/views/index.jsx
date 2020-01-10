import React from 'react';
import { Datatable, Search } from '@asl/components';
import Layout from '../../views';
import formatters from '../formatters';

export default function PersonalLicences() {

  return (
    <Layout tab={1}>
      <Search />
      <Datatable
        className="licence-fees-pils"
        formatters={formatters}
      />
    </Layout>
  );
}
