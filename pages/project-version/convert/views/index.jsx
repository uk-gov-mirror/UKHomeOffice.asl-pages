import React from 'react';
import { useSelector } from 'react-redux';
import {
  Form,
  Header,
  Snippet
} from '@ukhomeoffice/asl-components';

export default function ConvertProject() {
  const project = useSelector(state => state.static.project);

  return (
    <Form>
      <Header
        title={<Snippet>title</Snippet>}
        subtitle={project.title}
      />
      <p><Snippet>description</Snippet></p>
    </Form>
  );
}
