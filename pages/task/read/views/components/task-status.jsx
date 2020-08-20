import React from 'react';
import get from 'lodash/get';
import classnames from 'classnames';
import { Snippet } from '@asl/components';

const getStatusBadge = status => {
  const good = ['resolved'];
  const bad = ['rejected', 'withdrawn'];
  const className = classnames({ badge: true, complete: good.includes(status), rejected: bad.includes(status) });

  return <p><span className={ className }><Snippet>{ `status.${status}.state` }</Snippet></span></p>;
};

export default function TaskStatus({ task }) {
  const model = get(task, 'data.model');
  const latestActivity = task.activityLog[0];

  const isExtension = get(latestActivity, 'event.meta.payload.data.extended');
  let { action, status } = latestActivity;

  if (action === 'update' && isExtension) {
    status = 'deadline-extended';
    action = 'deadline-extended';
  }

  let snippetContent = `status.${status}.currentlyWith`;

  if (status === 'awaiting-endorsement') {
    snippetContent = `${snippetContent}.${model}`;
  }

  return (
    <div className="task-status">
      <h2><Snippet>sticky-nav.status</Snippet></h2>
      {getStatusBadge(status)}
      <p><Snippet optional>{snippetContent}</Snippet></p>
    </div>
  );
}
