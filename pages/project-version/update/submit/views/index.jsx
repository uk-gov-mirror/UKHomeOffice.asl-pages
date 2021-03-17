import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Snippet, Header, FormLayout } from '@asl/components';
import { Warning } from '@ukhomeoffice/react-components';

export default function Submit() {
  const model = useSelector(state => state.model);
  const { canEndorse } = useSelector(state => state.static);
  const isApplication = model.type === 'application';

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
        subtitle={model.data.title || 'Untitled project'}
      />
      {isApplication && (
        <Warning>
          <Snippet>{`warning.${canEndorse ? 'canEndorse' : 'cantEndorse'}`}</Snippet>
        </Warning>
      )}
    </FormLayout>
  );
}
