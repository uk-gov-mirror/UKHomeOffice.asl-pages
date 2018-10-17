import React, { Component } from 'react';

class StatusBar extends Component {
  render() {
    const {
      user = {},
      logoutLink = '/logout',
      logoutLabel = 'Sign Out'
    } = this.props;
    const profile = user.profile || {
      name: 'Unknown user'
    };
    return (
      <div className="status-bar">
        <span><a href="/profile">{profile.name}</a></span>
        |
        <span><a href={logoutLink}>{logoutLabel}</a></span>
      </div>
    );
  }
}

export default StatusBar;
