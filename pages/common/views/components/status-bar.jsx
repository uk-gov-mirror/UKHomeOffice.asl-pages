import React from 'react';

import Link from '../components/link';

const StatusBar = ({
  user: { profile },
  logoutLink = '/logout',
  logoutLabel = 'Sign Out',
  urls
}) => {
  return (
    <div className="status-bar">
      {
        profile && <React.Fragment><span><Link urls={urls} page="profile.view" profile={profile.id} label={`${profile.name}`} /></span>|</React.Fragment>
      }
      <span><a href={logoutLink}>{logoutLabel}</a></span>
    </div>
  )

}

export default StatusBar;
