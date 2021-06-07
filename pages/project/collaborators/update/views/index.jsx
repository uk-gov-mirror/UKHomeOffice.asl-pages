import React from 'react';
import { useSelector } from 'react-redux';
import { FormLayout, Header, Snippet } from '@asl/components';

export default function Update() {
  const { project, collaborator } = useSelector(state => state.static);
  const name = `${collaborator.firstName} ${collaborator.lastName}`;

  return (
    <FormLayout>
      <Header
        title={<Snippet name={name}>title</Snippet>}
        subtitle={project.title}
      />
    </FormLayout>
  );
}
