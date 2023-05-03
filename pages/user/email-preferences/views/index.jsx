import React, { useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import { Header, Snippet, Fieldset } from '@ukhomeoffice/asl-components';

export default function EmailPreferences() {
  const model = useSelector(state => state.model);
  const { profile, isAdmin, schema, errors, csrfToken, values } = useSelector(state => state.static);

  const [disabled, setDisabled] = useState(false);

  const onFormSubmit = e => {
    if (disabled) {
      e.preventDefault();
    }
    e.persist();
    setTimeout(() => setDisabled(true), 0);
  };

  return (
    <div className="email-preferences">

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <Header title={<Snippet>title</Snippet>} />

          <p><Snippet email={profile.email}>alerts.sentTo</Snippet></p>

          <h2><Snippet>{`alerts.heading.${isAdmin ? 'admin' : 'standard'}`}</Snippet></h2>
          <p><Snippet>alerts.ownLicences</Snippet></p>

          <form method="POST" noValidate onSubmit={onFormSubmit}>
            <input type="hidden" name="_csrf" value={csrfToken} />

            <Fieldset model={model} schema={pick(schema, 'projectCollaborations')} values={values} errors={errors} />

            {
              isAdmin &&
                <Fragment>
                  <h2><Snippet>alerts.otherLicences.heading</Snippet></h2>
                  <p><Snippet>alerts.otherLicences.description</Snippet></p>
                  <h3><Snippet>alerts.otherLicences.subheading</Snippet></h3>

                  <Fieldset model={model} schema={omit(schema, 'projectCollaborations')} values={values} errors={errors} />
                </Fragment>
            }

            <div className="control-panel">
              <button type="submit" className="govuk-button" disabled={disabled}><Snippet>buttons.submit</Snippet></button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}
