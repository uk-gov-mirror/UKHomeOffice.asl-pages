import React, { Fragment } from 'react';
import { Snippet, Link } from '@asl/components';

const WithdrawApplication = ({ showHeading, type }) => {
  return (
    <Fragment>
      {
        showHeading &&
        <h3><Snippet type={type}>task.withdrawTitle</Snippet></h3>
      }
      <p><Snippet type={type}>task.withdrawHint</Snippet></p>
      <Link path="?action=withdraw" className="govuk-button button-secondary" label={<Snippet type={type}>task.withdrawAction</Snippet>} />
    </Fragment>
  );
};

export default WithdrawApplication;
