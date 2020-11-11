import React, { Fragment } from 'react';
import Details from '../components/details';
import Licence from '../components/licence';
import CurrentActivity from '../components/current-activity';

export default function Overview() {
  return (
    <Fragment>
      <div className="govuk-grid-row overview">
        <div className="govuk-grid-column-two-thirds">
          <Details />
          <Licence />
        </div>
      </div>
      <CurrentActivity />
    </Fragment>
  );
}
