import React from 'react';

const StatusBar = ({
  user: { name },
  logoutLink = '/logout',
  logoutLabel = 'Sign Out'
}) => (
  <div className="status-bar">
    <span>{`${name}`}</span>|<span><a href={logoutLink}>{logoutLabel}</a></span>
  </div>
);

export default StatusBar;
