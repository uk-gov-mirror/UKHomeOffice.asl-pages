import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import { Link, Snippet } from '@asl/components';
import { dateFormat } from '../../../../constants';
import format from 'date-fns/format';

const getRole = (profile, task) => {
  if (profile.asruInspector) {
    return 'Inspector';
  }

  if (profile.asruLicensing) {
    return 'Licensing officer';
  }

  if (profile.id === task.data.subject.id) {
    return 'Applicant';
  }

  return '';
};

export const getStatus = eventName => eventName.substring(eventName.lastIndexOf(':') + 1);

const getStatusBadge = eventName => {
  const good = ['resolved'];
  const bad = ['rejected', 'withdrawn'];
  const status = getStatus(eventName);
  const className = classnames({ badge: true, complete: good.includes(status), rejected: bad.includes(status) });

  return <span className={ className }><Snippet>{ `status.${status}.state` }</Snippet></span>;
};

const getAuthor = (profile, task) => {
  const name = `${profile.firstName} ${profile.lastName}`;
  const role = getRole(profile, task);

  return (
    <p>
      { role && <span className="role">{role}: </span> }
      {
        profile.asruUser
          ? name
          : <Link page="profile.view" profileId={profile.id} establishmentId={task.data.establishmentId} label={name} />
      }
    </p>
  );
};

const LogItem = ({ log, task, ExtraMeta }) => {
  return (
    <li key={log.id}>
      <span className="date">{format(log.createdAt, dateFormat.datetime)}</span>
      {getStatusBadge(log.eventName)}
      {getAuthor(log.changedBy, task)}
      <p className="comment">{log.comment}</p>
      {
        ExtraMeta && <p><ExtraMeta item={log} task={task} /></p>
      }
    </li>
  );
};

class ActivityLog extends Component {
  constructor(props) {
    super(props);

    this.task = props.task;
    this.ExtraMeta = props.ExtraMeta;
    this.latestActivity = props.task.activityLog.shift();
  }

  componentDidMount() {
    this.setState({ open: false });
  }

  toggle() {
    return this.setState({ open: !this.state.open });
  }

  isOpen() {
    return !this.state || this.state.open;
  }

  render() {
    if (!this.task.activityLog) {
      return null;
    }

    return (
      <div className="activity-log">
        <h2><Snippet>sticky-nav.activity</Snippet></h2>

        <ul className="task-activity">
          <LogItem key={this.latestActivity.id} log={this.latestActivity} task={this.task} ExtraMeta={this.ExtraMeta} />
        </ul>

        <p className="toggle-switch">
          <a href="#" onClick={() => this.toggle()}>{this.isOpen() ? 'Hide earlier activity' : 'Show earlier activity' }</a>
        </p>

        <div className={classnames('older-activity', { hidden: !this.isOpen() })}>
          <ul className="task-activity">
            { this.task.activityLog.map(log => (
              <LogItem key={log.id} log={log} task={this.task} ExtraMeta={this.ExtraMeta} />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default ActivityLog;
