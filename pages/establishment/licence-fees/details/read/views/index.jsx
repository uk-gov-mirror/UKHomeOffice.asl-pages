import React from 'react';
import Layout from '../../../views';
import { ModelSummary, Link, Snippet } from '@ukhomeoffice/asl-components';

export default function Details() {
  const formatters = {
    hasPurchaseOrder: {
      format: (value, model) => {
        switch (model.hasPurchaseOrder) {
          case 'yes':
            return 'Yes';
          case 'no':
            return 'No';
          default:
            return '-';
        }
      }
    },
    declaredCurrent: {
      format: (value, model) => {
        return model.declaredCurrent ? 'Yes' : 'No';
      }
    }
  };

  return (
    <Layout tab={2}>
      <ModelSummary formatters={formatters} recurseOptionReveals />
      <Link page="establishment.fees.details.update" label={<Snippet>actions.editLink</Snippet>}/>
    </Layout>
  );
}
