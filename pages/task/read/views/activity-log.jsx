import React, { Fragment } from 'react';
import classnames from 'classnames';
import { Link, Snippet } from '@asl/components';
import { dateFormat } from '../../../../constants';
import format from 'date-fns/format';

const getName = profile => `${profile.firstName} ${profile.lastName}`;

export const getStatus = eventName => eventName.substring(eventName.lastIndexOf(':') + 1);

const getStatusBadge = eventName => {
  const good = ['resolved'];
  const bad = ['rejected', 'withdrawn'];
  const status = getStatus(eventName);
  const className = classnames({ badge: true, complete: good.includes(status), rejected: bad.includes(status) });

  return <span className={ className }><Snippet>{ `status.${status}.state` }</Snippet></span>;
};

const getProfile = (profile, establishmentId) => {
  const name = getName(profile);
  return profile.asruUser
    ? name
    : <Link page="profile.view" profileId={profile.id} establishmentId={establishmentId} label={name} />;
};

const ActivityLog = ({ task, ExtraMeta }) => {
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
            <p>{getProfile(log.changedBy, task.data.establishmentId)}</p>
            <p className="comment">{log.comment}</p>
            {
              ExtraMeta && <p><ExtraMeta item={log} task={task} /></p>
            }
            <p>{format(log.createdAt, dateFormat.datetime)}</p>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default ActivityLog;
