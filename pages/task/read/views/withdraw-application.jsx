import React, { Fragment } from 'react';
import { Snippet, Link } from '@asl/components';

const WithdrawApplication = ({ showHeading, type }) => {
  return (
    <Fragment>
      {
        showHeading &&
        <h3><Snippet type={type}>{`status.withdrawn-by-applicant.action.${type}`}</Snippet></h3>
      }
      <p><Snippet type={type}>{`status.withdrawn-by-applicant.hint.${type}`}</Snippet></p>
      <Link path="?action=withdraw" className="govuk-button button-secondary" label={<Snippet>actions.withdraw</Snippet>} />
    </Fragment>
  );
};

export default WithdrawApplication;
