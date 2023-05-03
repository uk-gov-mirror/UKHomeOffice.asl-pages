import React from 'react';
import { useSelector } from 'react-redux';
import { Datatable, Search, CSVDownloadLink } from '@ukhomeoffice/asl-components';
import Layout from '../../views';
import formatters from '../formatters';
import ExpandableRow from './row';

export default function PersonalLicences() {
  const allowedActions = useSelector(state => state.static.allowedActions);
  return (
    <Layout tab={1}>
      <CSVDownloadLink />
      <Search />
      <Datatable
        className="licence-fees-pils"
        formatters={formatters}
        Expandable={allowedActions.includes('pil.updateBillable') && ExpandableRow}
      />
    </Layout>
  );
}
