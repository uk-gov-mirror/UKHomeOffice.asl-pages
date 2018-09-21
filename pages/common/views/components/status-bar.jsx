import React from 'react';

const StatusBar = ({
  user: { profile },
  logoutLink = '/logout',
  logoutLabel = 'Sign Out'
}) => (
  <div className="status-bar">
    <span><a href="/profile">{profile.name}</a></span>
    |
    <span><a href={logoutLink}>{logoutLabel}</a></span>
  </div>
);

export default StatusBar;
