import React from 'react';
import { connect } from 'react-redux';
import { Snippet } from '@asl/components';

const WithdrawApplication = ({ csrfToken, showHeading = false }) => {
  return (
    <form method="POST" noValidate>
      {
        showHeading &&
        <h3><Snippet>task.withdrawTitle</Snippet></h3>
      }
      <p><Snippet>task.withdrawHint</Snippet></p>
      <button className="govuk-button button-secondary" type="submit">
        <Snippet>task.withdrawAction</Snippet>
      </button>
      <input type="hidden" name="_csrf" value={csrfToken} />
      <input type="hidden" id="status-withdrawn-by-applicant" name="status" value="withdrawn-by-applicant" />
    </form>
  );
};

const mapStateToProps = ({ static: { csrfToken } }) => ({ csrfToken });

export default connect(mapStateToProps)(WithdrawApplication);
