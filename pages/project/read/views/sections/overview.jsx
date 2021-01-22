import React, { Fragment } from 'react';
import Details from '../components/details';
import CurrentVersion from '../components/current-version';
import CurrentActivity from '../components/current-activity';
import RA from '../components/retrospective-assessment';

export default function Overview() {
  return (
    <Fragment>
      <div className="govuk-grid-row overview">
        <div className="govuk-grid-column-two-thirds">
          <Details />
          <RA />
          <CurrentVersion />
        </div>
      </div>
      <CurrentActivity />
    </Fragment>
  );
}
