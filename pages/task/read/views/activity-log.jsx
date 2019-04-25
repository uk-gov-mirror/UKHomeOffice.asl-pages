import React, { Component } from 'react';
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
    const task = this.props.task;

    if (!task.activityLog) {
      return null;
    }

    const ExtraMeta = this.props.ExtraMeta;
    const latestActivity = this.props.task.activityLog[0];

    return (
      <div className="activity-log">
        <h2><Snippet>sticky-nav.activity</Snippet></h2>

        <ul className="task-activity">
          <LogItem key={latestActivity.id} log={latestActivity} task={task} ExtraMeta={ExtraMeta} />
        </ul>

        <p className={classnames('toggle-switch', { open: this.isOpen() })}>
          <a href="#" onClick={() => this.toggle()}>
            { this.isOpen()
              ? <Snippet>activityLog.close</Snippet>
              : <Snippet>activityLog.open</Snippet>
            }
          </a>
        </p>

        <div className={classnames('older-activity', { hidden: !this.isOpen() })}>
          <ul className="task-activity">
            { task.activityLog.map((log, index) => (
              index > 0 && <LogItem key={log.id} log={log} task={task} ExtraMeta={ExtraMeta} />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default ActivityLog;
