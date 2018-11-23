import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Snippet,
  Link,
  Panel,
  ApplicationProgress
} from '@asl/components';

const STATES = [
  { state: 'submitted', active: true },
  { state: 'endorsed' },
  { state: 'granted' }
];

const Success = ({ profile }) => (
  <Fragment>
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <Panel
          title={<Snippet>pil.submitted.title</Snippet>}
          className="green-bg"
        >
          {
            // TODO: this should display the NTCO's email, or be removed.
          }
          <Snippet email={profile.email}>pil.submitted.summary</Snippet>
          <ApplicationProgress states={STATES} />
        </Panel>

        <div className="what-next">
          <h2><Snippet>pil.submitted.whatNext.title</Snippet></h2>
          <p><Snippet>pil.submitted.whatNext.summary</Snippet></p>
        </div>

        <Snippet>pil.submitted.body</Snippet>

        <Link page="profile.view" profile={profile.id} label={<Snippet>pil.submitted.homepage</Snippet>} />

      </div>
    </div>
  </Fragment>
);

const mapStateToProps = ({ static: { establishment, profile, pil } }) => ({ establishment, profile, pil });

export default connect(mapStateToProps)(Success);
