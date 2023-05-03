import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import {
  Snippet,
  Form,
  ErrorSummary,
  Header,
  TrainingSummary
} from '@ukhomeoffice/asl-components';

export default function Page() {
  const profile = useSelector(state => state.static.profile);
  return (
    <Fragment>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <ErrorSummary />
          <Header title={<Snippet>title</Snippet>} />
          <p><Snippet>intro</Snippet></p>
        </div>
      </div>
      <h3><Snippet>current-modules</Snippet></h3>
      <TrainingSummary certificates={profile.certificates} />
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <Form />
        </div>
      </div>
    </Fragment>
  );
}
