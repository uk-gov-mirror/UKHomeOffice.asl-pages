import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { ErrorSummary, Snippet, ControlBar, Header, Link } from '@asl/components';
import { CheckboxGroup } from '@ukhomeoffice/react-components';
import namedRoles from '../content/named-roles';

const Confirm = ({
  declaration = true,
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

        <hr />

        <ControlBar block={true}>
          <form method="POST" >
            {
              declaration && (
                <CheckboxGroup
                  id="declaration"
                  name="declaration"
                  error={
                    errors.declaration && <Snippet>{`errors.declaration.${errors.declaration}`}</Snippet>
                  }
                  label=""
                  options={[
                    {
                      value: 'true',
                      label: <Snippet>declaration</Snippet>
                    }
                  ]}
                />
              )
            }
            <input type="hidden" name="_csrf" value={csrfToken} />
            <button type="submit" className="govuk-button"><Snippet>buttons.submit</Snippet></button>
          </form>
          <Link page="profile.role.apply" label={<Snippet>buttons.edit</Snippet>} />
          <Link page="profile.view" label={<Snippet>buttons.cancel</Snippet>} />
        </ControlBar>
      </div>
    </div>
  </Fragment>
);

const mapStateToProps = ({
  model,
  static: { establishment, profile, errors, values, csrfToken }
}) => ({
  establishment,
  profile,
  model,
  errors,
  csrfToken,
  values
});

export default connect(mapStateToProps)(Confirm);
