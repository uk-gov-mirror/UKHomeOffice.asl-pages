import React from 'react';
import { useSelector } from 'react-redux';
import { FormLayout, Snippet, Header } from '@asl/components';
import Collaborators from '../../components/collaborators';

export default function AddUser() {
  const project = useSelector(state => state.static.project);
  return (
    <FormLayout cancelLink="project.read">
      <Header
        title={<Snippet>title</Snippet>}
        subtitle={project.title}
      />
      <Collaborators />
    </FormLayout>
  );
}
