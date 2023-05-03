import { connect } from 'react-redux';
import React from 'react';
import {
  Link,
  Snippet
} from '@ukhomeoffice/asl-components';

const RoleRemove = ({ allowedActions }) => {
  if (!allowedActions.includes('profile.roles')) {
    return null;
  }

  return (
    <div>
      <p>
        <Link
          page='role.delete'
          label={<Snippet>responsibilities.roleRemove</Snippet>}
        />
      </p>
    </div>
  );
};

const mapStateToProps = ({ static: { allowedActions } }) => ({ allowedActions });

export default connect(mapStateToProps)(RoleRemove);
