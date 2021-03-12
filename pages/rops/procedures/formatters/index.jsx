import React, { Fragment } from 'react';
import { Details, Snippet } from '@asl/components';

function SeverityHint() {
  return (
    <Fragment>
      <p><Snippet className="govuk-hint">fields.severity.hint</Snippet></p>
      <Details summary={<Snippet>fields.severity.summary</Snippet>}>
        <p>SOME CONTENT</p>
      </Details>
    </Fragment>
  );
}

export default {
  severity: {
    formatHint: SeverityHint
  }
};
