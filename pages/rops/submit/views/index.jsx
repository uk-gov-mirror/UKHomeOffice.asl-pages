import React from 'react';
import { useSelector } from 'react-redux';
import { Snippet, Header, FormLayout, Link } from '@ukhomeoffice/asl-components';

export default function Submit() {
  const project = useSelector(state => state.model.project);

  const cancelLink = <Link page="rops.procedures.list" suffix="review" label="Back" />;

  return (
    <FormLayout cancelLink={cancelLink}>
      <Header
        title={<Snippet>title</Snippet>}
        subtitle={project.title}
      />
      <Snippet>declaration</Snippet>
    </FormLayout>
  );
}
