import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  ApplicationConfirm,
  ControlBar,
  ErrorSummary,
  Header,
  Link,
  Snippet
} from '@asl/components';
import namedRoles from '../content/named-roles';

const Confirm = ({
  declarations,
  establishment,
  profile,
  model,
  errors = {},
  csrfToken,
  values,
  ...props
}) => (
  <Fragment>
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <ErrorSummary />
        <Header title={<Snippet>reviewRoleApplication</Snippet>}/>

        <h2><Snippet>applyingFor</Snippet></h2>
        <p>{namedRoles[values.role]}</p>

        <h2><Snippet>onBehalfOf</Snippet></h2>
        <p>{profile.name}</p>

        { values.rcvsNumber &&
          <Fragment>
            <h2><Snippet>rcvsNumber</Snippet></h2>
            <p>{values.rcvsNumber}</p>
          </Fragment>
        }

        <h2><Snippet>explanation</Snippet></h2>
        <p>{values.comment}</p>

        <ControlBar>
          <Link page="profile.role.apply" label={<Snippet>buttons.edit</Snippet>} />
          <Link page="profile.view" label={<Snippet>buttons.cancel</Snippet>} />
        </ControlBar>

        <form method="POST">
          <input type="hidden" name="_csrf" value={csrfToken} />
          <ApplicationConfirm />
        </form>

      </div>
    </div>
  </Fragment>
);

const mapStateToProps = ({
  model,
  static: { establishment, profile, declarations, errors, values, csrfToken }
}) => ({
  establishment,
  profile,
  model,
  declarations,
  errors,
  csrfToken,
  values
});

export default connect(mapStateToProps)(Confirm);
