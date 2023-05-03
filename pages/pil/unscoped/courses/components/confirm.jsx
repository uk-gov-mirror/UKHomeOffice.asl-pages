import React from 'react';
import { Header, Snippet, FormLayout, ModelSummary } from '@ukhomeoffice/asl-components';
import formatters from '../formatters';
import schema from '../read/schema';

export default function Confirm({ cancelLink }) {
  return (
    <FormLayout cancelLink={cancelLink}>
      <Header
        title={<Snippet>title</Snippet>}
      />
      <ModelSummary schema={schema} formatters={formatters} />
    </FormLayout>
  );
}
