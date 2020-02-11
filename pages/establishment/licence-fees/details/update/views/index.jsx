import React from 'react';
import { useSelector } from 'react-redux';
import { FormLayout, Header, Snippet, Inset } from '@asl/components';

export default function Details() {
  const establishment = useSelector(state => state.static.establishment);
  return (
    <FormLayout openTasks={establishment.openTasks}>
      <Header
        title={<Snippet>title</Snippet>}
        subtitle={establishment.name}
      />
      <Snippet>intro</Snippet>
      <Inset>
        <Snippet>inset</Snippet>
      </Inset>
    </FormLayout>
  );
}
