import React, { Fragment } from 'react';
import { Snippet, Link } from '@asl/components';

const WithdrawApplication = ({ showHeading }) => {
  return (
    <Fragment>
      {
        showHeading &&
        <h3><Snippet>task.withdrawTitle</Snippet></h3>
      }
      <p><Snippet>task.withdrawHint</Snippet></p>
      <Link path="?action=withdraw" className="govuk-button button-secondary" label={<Snippet>task.withdrawAction</Snippet>} />
    </Fragment>
  );
};

export default WithdrawApplication;
