import React from 'react';

import Link from '../containers/link';

const StatusBar = ({
  user: { profile },
  logoutLink = '/logout',
  logoutLabel = 'Sign Out'
}) => (
  <div className="status-bar">
    {
      profile && <React.Fragment><span><Link page="profile.view" profile={profile.id} label={`${profile.name}`} /></span>|</React.Fragment>
    }
    <span><a href={logoutLink}>{logoutLabel}</a></span>
  </div>
);

export default StatusBar;
