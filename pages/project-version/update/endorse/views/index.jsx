import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Snippet, Header, FormLayout } from '@asl/components';
import { Warning } from '@ukhomeoffice/react-components';

export default function Submit() {
  const { canEndorse, version } = useSelector(state => state.static);
  const isApplication = version.type === 'application';

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
        subtitle={version.data.title || 'Untitled project'}
      />
      {isApplication && (
        <Warning>
          <Snippet>{`warning.${canEndorse ? 'canEndorse' : 'cantEndorse'}`}</Snippet>
        </Warning>
      )}
    </FormLayout>
  );
}
