import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  ApplicationConfirm,
  ControlBar,
  FormLayout,
  Header,
  Link,
  Snippet
} from '@asl/components';
import namedRoles from '../content/named-roles';

const Confirm = ({
  establishment,
  profile,
  values,
  requiresDeclaration,
  ...props
}) => {
  const editPath = props.action === 'remove' ? 'delete' : 'create';

  return (
    <FormLayout submit={!requiresDeclaration}>
      <Header title={<Snippet>reviewRoleApplication</Snippet>}/>
      <h2><Snippet>applyingFor</Snippet></h2>
      <p>{namedRoles[values.type]}</p>

      <h2><Snippet>onBehalfOf</Snippet></h2>
      <p>{`${profile.firstName} ${profile.lastName}`}</p>

      { values.rcvsNumber &&
        <Fragment>
          <h2><Snippet>rcvsNumber</Snippet></h2>
          <p>{values.rcvsNumber}</p>
        </Fragment>
      }

      <h2><Snippet>explanation</Snippet></h2>
      <p>{values.comment}</p>

      <ControlBar>
        <Link page="role" path={editPath} label={<Snippet>buttons.edit</Snippet>} />
        <Link page="profile.read" label={<Snippet>buttons.cancel</Snippet>} />
      </ControlBar>

      {
        requiresDeclaration && <ApplicationConfirm />
      }
    </FormLayout>
  );
};

const mapStateToProps = ({
  static: {
    establishment,
    profile,
    values,
    requiresDeclaration
  }
}) => ({
  establishment,
  profile,
  values,
  requiresDeclaration
});

export default connect(mapStateToProps)(Confirm);
