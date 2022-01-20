import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Snippet, Header, FormLayout } from '@asl/components';
import { Warning } from '@ukhomeoffice/react-components';

export default function Submit() {
  const { canEndorse } = useSelector(state => state.static);
  const project = useSelector(state => state.model);
  const isApplication = project.type === 'application';
  const type = isApplication ? 'application' : 'amendment';

  const declaration = (
    <Fragment>
      <h2><Snippet>declaration.title</Snippet></h2>
      <Snippet>declaration.content</Snippet>
    </Fragment>
  );

  return (
    <FormLayout declaration={canEndorse && declaration}>
      <Header
        title={<Snippet>title</Snippet>}
        subtitle={project.title || 'Untitled project'}
      />
      <Warning>
        <Snippet>{`warning.${type}.${canEndorse ? 'canEndorse' : 'cantEndorse'}`}</Snippet>
      </Warning>
    </FormLayout>
  );
}
