import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Snippet, Link, Panel } from '@asl/components';

const Success = ({ profile }) => (
  <Fragment>
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">

        <Panel title={<Snippet>panel.title</Snippet>} className="green-bg">
          <Snippet>panel.summary</Snippet>
          <p className="govuk-!-font-weight-bold">{profile.email}</p>
        </Panel>

        <div className="what-next">
          <h2><Snippet>whatNext.title</Snippet></h2>
          <p><Snippet>whatNext.summary</Snippet></p>
        </div>

        <Link page="dashboard" profile={profile.id} label={<Snippet>link.dashboard</Snippet>} />

      </div>
    </div>
  </Fragment>
);

const mapStateToProps = ({ static: { profile } }) => ({ profile });

export default connect(mapStateToProps)(Success);
