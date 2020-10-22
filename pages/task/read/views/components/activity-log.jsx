import React, { Fragment, useState } from 'react';
import classnames from 'classnames';
import get from 'lodash/get';
import { Link, Snippet, Markdown, Inset } from '@asl/components';
import { dateFormat } from '../../../../../constants';
import format from 'date-fns/format';
import { daysSinceDate, isDeadlineExtension } from '../../../../../lib/utils';
import PplDeclarations from './ppl-declarations';

function ProfileLink({ id, name, establishmentId, asruUser }) {
  if (establishmentId && !asruUser) {
    return <Link page="profile.read" profileId={id} establishmentId={establishmentId} label={name} />;
  } else {
    return <Link page="globalProfile" profileId={id} label={name} />;
  }
}

function Action({ task, action, changedBy }) {
  const type = task.type;
  const name = `${changedBy.firstName} ${changedBy.lastName}`;
  if (action === 'autoresolved') {
    return <p><strong><Snippet>status.autoresolved.log</Snippet></strong></p>;
  }
  return (
    <p>
      <strong><Snippet fallback={`status.${action}.log`}>{`status.${action}.log.${type}`}</Snippet></strong>
      <strong>: </strong>
      <ProfileLink id={changedBy.id} name={name} establishmentId={task.data.establishmentId} asruUser={changedBy.asruUser} />
    </p>
  );
}

function InspectorRecommendation({ item }) {
  if (!['inspector-recommended', 'inspector-rejected'].includes(item.status)) {
    return null;
  }

  const deadlineAtTimeOfRecommendation = get(item, 'event.data.deadline');
  let daysSinceDeadline;

  if (deadlineAtTimeOfRecommendation) {
    const isExtended = get(deadlineAtTimeOfRecommendation, 'isExtended', false);
    const deadlineDate = get(deadlineAtTimeOfRecommendation, isExtended ? 'extended' : 'standard');
    daysSinceDeadline = daysSinceDate(deadlineDate, item.createdAt);
  }

  return <Fragment>
    {
      daysSinceDeadline > 0 &&
        <p className="deadline-passed">
          <Snippet days={daysSinceDeadline}>{`deadline.lateDecision.${daysSinceDeadline > 1 ? 'plural' : 'singular'}`}</Snippet>
        </p>
    }
    <p><Snippet>{`status.${item.status}.recommendation`}</Snippet></p>
  </Fragment>;
}

const actionPerformedByAdmin = item => {
  const establishmentId = get(item, 'event.data.establishmentId');
  const profile = get(item, 'event.meta.user.profile');
  return !!profile.establishments.find(e => e.id === establishmentId && e.role === 'admin');
};

function DeadlineDetails({ item }) {
  const standardDeadline = get(item, 'event.data.deadline.standard');
  const extendedDeadline = get(item, 'event.data.deadline.extended');

  if (!standardDeadline || !extendedDeadline) {
    return null;
  }

  return (
    <Fragment>
      <p>
        <strong><Snippet>deadline.extension.from</Snippet></strong> <span>{format(standardDeadline, dateFormat.long)}</span>
      </p>
      <p>
        <strong><Snippet>deadline.extension.to</Snippet></strong> <span>{format(extendedDeadline, dateFormat.long)}</span>
      </p>
    </Fragment>
  );
}

function ExtraPilMeta({ item }) {
  const declaration = get(item, 'event.meta.payload.meta.declaration');

  if (!declaration) {
    return null;
  }

  return (
    <div className="declaration">
      <p>Declaration:</p>
      <Inset>
        <Markdown>{declaration}</Markdown>
      </Inset>
    </div>
  );

}

function ExtraProjectMeta({ item, task }) {
  const mostRecentActivity = item.id === task.activityLog[0].id;
  const versionId = get(item, 'event.data.data.version');
  const status = get(item, 'event.status');
  const isEndorsed = get(item, 'event.data.meta.authority', '').toLowerCase() === 'yes';
  const isAwerbed = get(item, 'event.data.meta.awerb', '').toLowerCase() === 'yes';
  const requiresAdminInteraction = !isEndorsed || (!isAwerbed && !actionPerformedByAdmin(item));

  if (mostRecentActivity || !versionId) {
    return null;
  }

  if (status === 'endorsed' || (status === 'resubmitted' && !requiresAdminInteraction)) {
    return (
      <Fragment>
        <PplDeclarations task={item.event} />
        <p>
          <Link
            page="projectVersion"
            versionId={versionId}
            establishmentId={task.data.establishmentId}
            projectId={task.data.id}
            label={<Snippet date={format(item.createdAt, dateFormat.long)}>viewVersionLink</Snippet>}
          />
        </p>
      </Fragment>
    );
  }

  return null;
}

function Comment({ changedBy, comment }) {
  return comment && (
    <div className="comment">
      <p className="author">{`${changedBy.firstName} ${changedBy.lastName} commented:`}</p>
      <Inset>
        <Markdown className="content">{comment}</Markdown>
      </Inset>
    </div>
  );
}

function LogItem({ item, task }) {
  let { action } = item;
  const isExtension = isDeadlineExtension(item);

  if (action === 'update' && isExtension) {
    action = 'deadline-extended';
  }

  return (
    <div className="log-item" id={item.id}>
      <span className="date">{format(item.createdAt, dateFormat.long)}</span>
      <Action task={task} action={action} changedBy={item.changedBy} />
      <InspectorRecommendation item={item} />
      { isExtension && <DeadlineDetails item={item} /> }
      { task.data.model === 'pil' && <ExtraPilMeta item={item} /> }
      <Comment changedBy={item.changedBy} comment={item.comment} />
      { task.data.model === 'project' && <ExtraProjectMeta item={item} task={task} /> }
    </div>
  );
}

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

      <LogItem key={latestActivity.id} item={latestActivity} task={task} />

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
                task.activityLog.slice(1).map(item => (
                  <li key={item.id}>
                    <LogItem item={item} task={task} />
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
