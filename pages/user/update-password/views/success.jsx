import React from 'react';
import { Header, Panel, Snippet, Link } from '@asl/components';

export default function Index() {
  return (
    <div className="govuk-grid-row success">
      <div className="govuk-grid-column-two-thirds">
        <Header title={<Snippet>success.heading</Snippet>} />
        <Panel title={<Snippet>success.panel.title</Snippet>} className="green-bg success" />

        <div className="what-next">
          <h2><Snippet>success.whatNext.title</Snippet></h2>
          <p><Snippet optional>success.whatNext.body</Snippet></p>
        </div>

        <Link page="dashboard" label={<Snippet>success.action.login</Snippet>} className="govuk-button" />
      </div>
    </div>
  );
}
