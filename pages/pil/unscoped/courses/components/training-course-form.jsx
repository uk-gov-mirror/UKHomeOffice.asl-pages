import React from 'react';
import { useSelector } from 'react-redux';
import { Header, Snippet, FormLayout } from '@ukhomeoffice/asl-components';

export default function Create({ cancelLink }) {
  const model = useSelector(state => state.model);
  return (
    <FormLayout cancelLink={cancelLink}>
      <Header
        title={<Snippet>title</Snippet>}
        subtitle={model.title || null}
      />
    </FormLayout>
  );
}
