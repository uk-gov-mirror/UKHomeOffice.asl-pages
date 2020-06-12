import React, { Fragment, useState } from 'react';
import classnames from 'classnames';
import get from 'lodash/get';
import { Link, Snippet, Markdown } from '@asl/components';
import { dateFormat } from '../../../../../constants';
import format from 'date-fns/format';

const getStatusBadge = status => {
  const good = ['resolved'];
  const bad = ['rejected', 'withdrawn'];
  const className = classnames({ badge: true, complete: good.includes(status), rejected: bad.includes(status) });

  return <span className={ className }><Snippet>{ `status.${status}.state` }</Snippet></span>;
};

const getProfileLink = ({ id, name, establishmentId, asruUser }) => {
  if (establishmentId && !asruUser) {
    return <Link page="profile.read" profileId={id} establishmentId={establishmentId} label={name} />;
  } else {
    return <Link page="globalProfile" profileId={id} label={name} />;
  }
};

const getAuthor = (changedBy, action, status, task) => {
  const type = task.type;
  const name = `${changedBy.firstName} ${changedBy.lastName}`;
  return (
    <p>
      <strong><Snippet fallback={`status.${action}.log`}>{`status.${action}.log.${type}`}</Snippet></strong>
      <strong>: </strong>
      {
        getProfileLink({ id: changedBy.id, name, establishmentId: task.data.establishmentId, asruUser: changedBy.asruUser })
      }
    </p>
  );
};

const getRecommendation = status => {
  return <p><Snippet>{`status.${status}.recommendation`}</Snippet></p>;
};

const ExtraProjectMeta = ({ item, task }) => {
  const status = item.event.status;
  if (status !== 'with-inspectorate' && status !== 'resubmitted') {
    return null;
  }
  const versionId = get(item, 'event.data.data.version');
  if (!versionId) {
    return null;
  }
  return <p><Link page="projectVersion" versionId={versionId} establishmentId={task.data.establishmentId} projectId={task.data.id} label="View this version"/></p>;
};

const LogItem = ({ log, task }) => {
  const isExtension = get(log, 'event.meta.payload.data.extended');
  let { action, status } = log;

  if (action === 'update' && isExtension) {
    status = 'deadline-extended';
    action = 'deadline-extended';
  }

  return (
    <div className="log-item">
      <span className="date">{format(log.createdAt, dateFormat.medium)}</span>
      {getStatusBadge(status)}
      {getAuthor(log.changedBy, action, status, task)}
      {(status === 'inspector-recommended' || status === 'inspector-rejected') && getRecommendation(status)}
      {
        task.data.model === 'project' && <ExtraProjectMeta item={log} task={task} />
      }
      <Markdown className="comment">{log.comment}</Markdown>
    </div>
  );
};

export default function ActivityLog({ task }) {
  const [open, setOpen] = useState(false);

  function toggle(e) {
    e.preventDefault();
    setOpen(!open);
  }

  if (!task.activityLog) {
    return null;
  }

  const latestActivity = task.activityLog[0];

  return (
    <div className="activity-log">
      <h2><Snippet>sticky-nav.activity</Snippet></h2>

      <LogItem key={latestActivity.id} log={latestActivity} task={task} />

      { task.activityLog.length > 1 &&
        <Fragment>
          <p className={classnames('toggle-switch', { open })}>
            <a href="#" onClick={toggle}>
              {
                open
                  ? <Snippet>activityLog.close</Snippet>
                  : <Snippet>activityLog.open</Snippet>
              }
            </a>
          </p>

          <div className={classnames('older-activity', { hidden: !open })}>
            <ul className="task-activity">
              {
                task.activityLog.slice(1).map(log => (
                  <li key={log.id}>
                    <LogItem log={log} task={task} />
                  </li>
                ))
              }
            </ul>
          </div>
        </Fragment>
      }
    </div>
  );
}
