import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Header, Snippet, Form } from '@asl/components';

export default function EmailPreferences() {
  const { profile, isAdmin } = useSelector(state => state.static);

  return (
    <div className="email-preferences">

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <Header title={<Snippet>title</Snippet>} />

          <p><Snippet email={profile.email}>alerts.sentTo</Snippet></p>

          <h2><Snippet>{`alerts.heading.${isAdmin ? 'admin' : 'standard'}`}</Snippet></h2>
          <p><Snippet>alerts.ownLicences</Snippet></p>

          {
            isAdmin &&
              <Fragment>
                <h2><Snippet>alerts.otherLicences.heading</Snippet></h2>
                <p><Snippet>alerts.otherLicences.description</Snippet></p>
                <h3><Snippet>alerts.otherLicences.subheading</Snippet></h3>
                <Form />
              </Fragment>
          }
        </div>
      </div>

    </div>
  );
}
