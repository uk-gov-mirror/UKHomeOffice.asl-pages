import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import { Snippet, Header, FormLayout } from '@asl/components';
import { Warning } from '@ukhomeoffice/react-components';

export default function Submit() {
  const { canEndorse } = useSelector(state => state.static);
  const type = useSelector(state => state.model.type);
  const title = useSelector(state => state.model.title || get(state, 'model.project.title') || 'Untitled project');
  const isApplication = type === 'application';
  const taskType = isApplication ? 'application' : 'amendment';

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
        subtitle={title}
      />
      <Warning>
        <Snippet>{`warning.${taskType}.${canEndorse ? 'canEndorse' : 'cantEndorse'}`}</Snippet>
      </Warning>
    </FormLayout>
  );
}
