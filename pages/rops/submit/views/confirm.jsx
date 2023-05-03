import React from 'react';
import { useSelector } from 'react-redux';
import { Snippet, Header, FormLayout } from '@ukhomeoffice/asl-components';

export default function Submit() {
  const project = useSelector(state => state.model.project);
  return (
    <FormLayout cancelLink="rops.procedures">
      <Header
        title={<Snippet>title</Snippet>}
        subtitle={project.title}
      />
    </FormLayout>
  );
}
