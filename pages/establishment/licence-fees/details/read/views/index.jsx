import React from 'react';
import Layout from '../../../views';
import { ModelSummary, Link, Snippet } from '@ukhomeoffice/asl-components';

export default function Details() {
  return (
    <Layout tab={2}>
      <ModelSummary />
      <Link page="establishment.fees.details.update" label={<Snippet>actions.editLink</Snippet>}/>
    </Layout>
  );
}
