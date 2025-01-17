import React from 'react';
import { useSelector } from 'react-redux';
import { Snippet, Header, FormLayout } from '@asl/components';

export default function Submit() {
  const project = useSelector(state => state.static.project);
  return (
    <FormLayout cancelLink="rops.procedures">
      <Header
        title={<Snippet>title</Snippet>}
        subtitle={project.title}
      />
      <p><Snippet>declaration</Snippet></p>
    </FormLayout>
  );
}
