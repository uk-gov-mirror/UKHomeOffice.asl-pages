import React from 'react';
import get from 'lodash/get';
import classnames from 'classnames';
import { Snippet } from '@asl/components';
import Deadline from './deadline';
import RefusalNoticeWarning from './refusal-notice-warning';

const getStatusBadge = (status, model) => {
  const good = ['resolved'];
  const bad = ['rejected', 'withdrawn', 'discarded-by-applicant', 'refused'];
  const className = classnames({ badge: true, complete: good.includes(status) || model === 'rop', rejected: bad.includes(status) });
  return <span className={ className }><Snippet>{ `status.${status}.state` }</Snippet></span>;
};

export default function TaskStatus({ task }) {
  const model = get(task, 'data.model');
  const status = task.status;

  let snippetContent = `status.${status}.currentlyWith`;

  if (status === 'awaiting-endorsement') {
    snippetContent = `${snippetContent}.${model}`;
  }

  return (
    <div className="task-status">
      <h2><Snippet>sticky-nav.status</Snippet></h2>
      <p className="gutter">
        {getStatusBadge(status, model)}
        <span className="currently-with"><Snippet optional>{snippetContent}</Snippet></span>
      </p>
      { model === 'project' && <RefusalNoticeWarning task={task} /> }
      { model === 'project' && <Deadline task={task} /> }
    </div>
  );
}
