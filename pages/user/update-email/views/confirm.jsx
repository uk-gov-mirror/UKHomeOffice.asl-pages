import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { ControlBar, Diff, ErrorSummary, Header, Snippet } from '@asl/components';
import { hasChanged } from '../../../../lib/utils';

const Confirm = ({ profile, csrfToken }) => {
  return (
    <Fragment>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <ErrorSummary />

          <Header title={<Snippet>pages.account.updateEmail.confirm</Snippet>} />

          <Diff comparator={hasChanged} model={profile} />

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
    profile,
    static: {
      csrfToken
    }
  }
) => (
  {
    profile,
    csrfToken
  }
);

export default connect(mapStateToProps)(Confirm);
