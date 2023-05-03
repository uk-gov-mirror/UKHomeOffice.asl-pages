import React, { Fragment } from 'react';
import { Snippet, Details, Inset } from '@ukhomeoffice/asl-components';
import content from '../content';
import has from 'lodash/has';

function SeverityHint() {
  return (
    <Fragment>
      <p><Snippet className="govuk-hint">fields.severity.hint</Snippet></p>
      <Details summary={<Snippet>fields.severity.summary</Snippet>}>
        <Inset><Snippet>fields.severity.details</Snippet></Inset>
      </Details>
    </Fragment>
  );
}

function SeverityNumHint({ prefix }) {
  return (
    <Fragment>
      { has(content, `fields.severityNum.${prefix}.hint`) &&
        <p><Snippet className="govuk-hint">{`fields.severityNum.${prefix}.hint`}</Snippet></p>
      }

      { has(content, `fields.severityNum.${prefix}.summary`) &&
        <Details summary={<Snippet>{`fields.severityNum.${prefix}.summary`}</Snippet>}>
          <Inset><Snippet>{`fields.severityNum.${prefix}.details`}</Snippet></Inset>
        </Details>
      }
    </Fragment>
  );
}

export default {
  severity: {
    formatHint: SeverityHint
  },
  severityNum: {
    formatHint: SeverityNumHint
  }
};
