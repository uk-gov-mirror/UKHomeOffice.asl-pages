import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { ControlBar, Header, Snippet } from '@ukhomeoffice/asl-components';

const Confirm = ({ profile, csrfToken, values }) => {
  return (
    <Fragment>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <Header title={<Snippet>pages.account.updateEmail.confirm</Snippet>} />
          <br />

          <h3><Snippet>fields.email.current</Snippet></h3>
          <p>{profile.email}</p>
          <br />

          <h3><Snippet>fields.email.label</Snippet></h3>
          <p>{values.email}</p>
          <br />

          <form method="POST">
            <ControlBar>
              <input type="hidden" name="_csrf" value={csrfToken} />
              <button type="submit" className="govuk-button"><Snippet>buttons.submit</Snippet></button>
              <a href="?edit=true"><Snippet>buttons.edit</Snippet></a>
              <a href="?cancel=true"><Snippet>buttons.cancel</Snippet></a>
            </ControlBar>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (
  {
    static: {
      csrfToken,
      profile,
      values
    }
  }
) => (
  {
    csrfToken,
    profile,
    values
  }
);

export default connect(mapStateToProps)(Confirm);
