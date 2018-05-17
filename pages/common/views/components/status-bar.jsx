import React from 'react';

const StatusBar = ({
  name,
  logoutLink
}) => (
  <div className="status-bar">
    <span>{`${name}`}</span> | <span><a href={logoutLink}>Sign Out</a></span>
  </div>
);

StatusBar.defaultProps = {
  logoutLink: '/logout'
};

export default StatusBar;
