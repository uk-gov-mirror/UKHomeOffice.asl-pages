import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Snippet from '../../../common/views/containers/snippet';
import Link from '../../../common/views/containers/link';

const Success = ({ profile }) => (
  <Fragment>
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">

        <div className="govuk-panel govuk-panel--confirmation">
          <h1 className="govuk-panel__title">
            <Snippet>pil.submitted.title</Snippet>
          </h1>
          <div className="govuk-panel__body">
            <p>
              <Snippet>pil.submitted.summary</Snippet>
              <br />
              {
                // TODO: this should display the NTCO's email, or be removed.
              }
              {profile.email}
            </p>
          </div>
          <ul className="pil-progress">
            <li className="complete">Submitted</li>
            <li>Endorsed</li>
            <li>Licence granted</li>
          </ul>
        </div>

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
