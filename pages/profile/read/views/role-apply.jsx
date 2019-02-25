import React from 'react';
import { Link, Snippet } from '@asl/components';

class RoleApply extends React.Component {
  render() {
    const { allowedActions, estId, profileId } = this.props;

    if (!allowedActions.includes('profile.roles')) {
      return null;
    }
    return (
      <div>
        <p>
          <Link
            page='profile.role.apply.base'
            establishmentId={estId}
            profileId={profileId}
            className='govuk-button'
            label={<Snippet>responsibilities.roleApply</Snippet>}
          />
        </p>
      </div>
    );
  }
}

export default RoleApply;
