import React, { Fragment } from 'react';
import { Panel, Link, Snippet } from '@asl/components';

const Success = () => (
  <Fragment>
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">

        <Panel title={<Snippet>panel.title</Snippet>} className="green-bg" />

        <div className="what-next">
          <h2><Snippet>whatNext.title</Snippet></h2>
          <p><Snippet>whatNext.text1</Snippet></p>
          <p><Snippet>whatNext.text2</Snippet></p>
        </div>

        <Link page="dashboard" label={<Snippet>link.dashboard</Snippet>} />

      </div>
    </div>
  </Fragment>
);

export default Success;
