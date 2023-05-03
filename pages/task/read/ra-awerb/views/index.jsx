import React from 'react';
import { useSelector } from 'react-redux';
import { FormLayout, Snippet, Header } from '@ukhomeoffice/asl-components';

export default function DeadlinePassedReason() {
  const project = useSelector(state => state.static.project);
  return (
    <FormLayout>
      <Header
        title={<Snippet>title</Snippet>}
        subtitle={project.title}
      />
      <Snippet>declaration</Snippet>
    </FormLayout>
  );
}
