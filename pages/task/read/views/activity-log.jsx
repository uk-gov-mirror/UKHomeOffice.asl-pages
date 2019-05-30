import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import { Link, Snippet } from '@asl/components';
import { dateFormat } from '../../../../constants';
import format from 'date-fns/format';

const getStatusBadge = status => {
  const good = ['resolved'];
  const bad = ['rejected', 'withdrawn'];
  const className = classnames({ badge: true, complete: good.includes(status), rejected: bad.includes(status) });

  return <span className={ className }><Snippet>{ `status.${status}.state` }</Snippet></span>;
};

const getAuthor = ({ changedBy, event: { status } }, task) => {
  const name = `${changedBy.firstName} ${changedBy.lastName}`;
  const action = <Snippet fallback={`status.${status}.log`}>{`status.${status}.log.${task.type}`}</Snippet>
  return (
    <p>
      <strong>{action}: </strong>
      {
        changedBy.asruUser
          ? name
          : <Link page="profile.view" profileId={changedBy.id} establishmentId={task.data.establishmentId} label={name} />
      }
    </p>
  );
};

const LogItem = ({ log, task, ExtraMeta }) => {
  return (
    <li key={log.id}>
      <span className="date">{format(log.createdAt, dateFormat.medium)}</span>
      {getStatusBadge(log.event.status)}
      {getAuthor(log, task)}
      {
        ExtraMeta && <ExtraMeta item={log} task={task} />
      }
      <p className="comment">{log.comment}</p>
    </li>
  );
};

class ActivityLog extends Component {
  componentDidMount() {
    this.setState({ open: false });
  }

  toggle(e) {
    e.preventDefault();
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

        { task.activityLog.length > 1 &&
          <Fragment>
            <p className={classnames('toggle-switch', { open: this.isOpen() })}>
              <a href="#" onClick={e => this.toggle(e)}>
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
          </Fragment>
        }
      </div>
    );
  }
}

export default ActivityLog;
