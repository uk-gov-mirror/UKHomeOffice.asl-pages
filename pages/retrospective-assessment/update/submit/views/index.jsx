import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Snippet, Header, FormLayout } from '@ukhomeoffice/asl-components';

export default function Submit() {
  const { canEndorse, project } = useSelector(state => state.static);
  return (
    <FormLayout>
      <Header
        title={<Snippet>title</Snippet>}
        subtitle={project.title}
      />
      {
        canEndorse
          ? (
            <Fragment>
              <h3><Snippet>declarationTitle</Snippet></h3>
              <p><Snippet>declaration</Snippet></p>
            </Fragment>
          )
          : <p><Snippet>content</Snippet></p>
      }
    </FormLayout>
  );
}
