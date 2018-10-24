import React, { Component, Fragment } from 'react';

class StatusBar extends Component {
  render() {
    const {
      user = {},
      logoutLink = '/logout',
      logoutLabel = 'Sign Out'
    } = this.props;
    return (
      <div className="status-bar">
        { user && user.profile && (
          <Fragment>
            <span><a href="/profile">{user.profile.name}</a></span>
            |
          </Fragment>
        )}
        <span><a href={logoutLink}>{logoutLabel}</a></span>
      </div>
    );
  }
}

export default StatusBar;
