import React from 'react';
import { useSelector } from 'react-redux';
import { Header, Snippet, FormLayout, ModelSummary } from '@asl/components';
import formatters from '../formatters';
import schema from '../read/schema';

export default function Confirm({ cancelLink }) {
  const model = useSelector(state => state.model);
  return (
    <FormLayout cancelLink={cancelLink}>
      <Header
        title={<Snippet>title</Snippet>}
        subtitle={model.title}
      />
      <ModelSummary schema={schema} formatters={formatters} />
    </FormLayout>
  );
}
