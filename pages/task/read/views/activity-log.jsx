import React, { Fragment } from 'react';
import classnames from 'classnames';
import { Link, Snippet } from '@asl/components';
import { dateFormat } from '../../../../constants';
import format from 'date-fns/format';

const getName = profile => `${profile.firstName} ${profile.lastName}`;

const getStatusBadge = eventName => {
  const good = ['resolved'];
  const bad = ['rejected', 'withdrawn'];
  const status = eventName.substring(eventName.lastIndexOf(':') + 1);
  const className = classnames({ badge: true, complete: good.includes(status), rejected: bad.includes(status) });

  return <span className={ className }><Snippet>{ `status.${status}.state` }</Snippet></span>;
};

const ActivityLog = ({ task }) => {
  if (!task.activityLog) {
    return null;
  }

  return (
    <Fragment>
      <h2><Snippet>sticky-nav.activity</Snippet></h2>
      <ul className="task-activity">
        { task.activityLog.map(log => (
          <li key={log.id}>
            {getStatusBadge(log.eventName)}
            <p><Link page="profile.view" profileId={log.changedBy.id} label={getName(log.changedBy)} /></p>
            <p className="comment">{log.comment}</p>
            <p>{format(log.createdAt, dateFormat.shortWithTime)}</p>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default ActivityLog;
