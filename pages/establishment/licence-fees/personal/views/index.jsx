import React from 'react';
import { useSelector } from 'react-redux';
import { Datatable } from '@asl/components';
import Layout from '../../views';
import ExpandableRow from './row';
import formatters from '../formatters';

export default function PersonalLicences() {
  const allowedActions = useSelector(state => state.static.allowedActions);

  return (
    <Layout tab={1}>
      <Datatable className="licence-fees-pils" formatters={formatters} Expandable={allowedActions.includes('pil.updateBillable') && ExpandableRow} />
    </Layout>
  );
}
