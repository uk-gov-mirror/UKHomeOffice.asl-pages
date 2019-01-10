import { connect } from 'react-redux';
import React from 'react';
import {
  Link,
  Snippet
} from '@asl/components';

const RoleApply = ({ allowedActions }) => {
  console.log(allowedActions);

  if (!allowedActions.includes('profile.roles')) {
    return null;
  }

  return (
    <div>
      <p>
        <Link
          page='profile.role.apply'
          className="govuk-button"
          label={<Snippet>responsibilities.roleApply</Snippet>}
        />
      </p>
    </div>
  );
};

const mapStateToProps = ({ static: { allowedActions } }) => ({ allowedActions });

export default connect(mapStateToProps)(RoleApply);
