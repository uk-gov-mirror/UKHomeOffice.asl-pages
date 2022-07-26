import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import get from 'lodash/get';
import { Link, Snippet, Markdown, Inset } from '@asl/components';
import { dateFormat } from '../../../../../constants';
import format from 'date-fns/format';
import { daysSinceDate, isDeadlineExtension, isDeadlineRemove, isDeadlineReinstate, isTrueish } from '../../../../../lib/utils';
import PplDeclarations from './ppl-declarations';

function ProfileLink({ id, name, establishmentId, asruUser }) {
  if (establishmentId && !asruUser) {
    return <Link page="profile.read" profileId={id} establishmentId={establishmentId} label={name} />;
  } else {
    return <Link page="globalProfile" profileId={id} label={name} />;
  }
}

function Action({ task, action, activity, changedBy }) {
  const type = task.type;
  const name = `${changedBy.firstName} ${changedBy.lastName}`;
  if (action === 'autoresolved') {
    return <p><strong><Snippet>status.autoresolved.log</Snippet></strong></p>;
  }
  if (action === 'discarded-by-asru' && !changedBy.id) {
    return <p><strong><Snippet>status.autodiscarded.log</Snippet></strong></p>;
  }
  if (task.data.model === 'rop') {
    action = task.status;
  }

  const establishmentId = get(activity, 'event.data.establishmentId');
  const profile = get(activity, 'event.meta.user.profile');
  const establishment = profile.establishments.find(e => e.id === establishmentId) || {};
  let approvedByMsg = `status.${action}.log.${type}`;

  if (!profile.asruUser && action === 'resolved') {
    const approvedByPELH = profile.roles.find(r => r.type === 'pelh' && r.establishmentId === establishmentId);
    approvedByMsg = approvedByPELH ? `status.${action}.by-pelh` : `status.${action}.on-behalf-of-pelh`;
  }

  return (
    <p className="gutter">
      <strong><Snippet fallback={`status.${action}.log`} establishmentName={establishment.name}>{approvedByMsg}</Snippet></strong>
      <strong>: </strong>
      <ProfileLink id={changedBy.id} name={name} establishmentId={establishment.id || task.data.establishmentId} asruUser={changedBy.asruUser} />
    </p>
  );
}

function Assignment({ item }) {
  const assignedTo = item.assignedTo;
  return (
    <p>
      <strong>Assigned to</strong>
      <strong>: </strong>
      {
        assignedTo
          ? <ProfileLink id={assignedTo.id} name={`${assignedTo.firstName} ${assignedTo.lastName}`} asruUser={true} />
          : <em>Unassigned</em>
      }

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

function AwerbDate({ item }) {
  const awerb = get(item, 'event.meta.payload.meta.ra-awerb-date');

  if (!awerb) {
    return null;
  }

  return (
    <p>Date of the most recent AWERB review<br />{format(awerb, dateFormat.long)}</p>
  );
}

function DeclarationMeta({ item }) {
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
  if (task.data.model !== 'project') {
    return null;
  }

  let establishmentId = get(item, 'event.data.modelData.establishmentId');
  let projectId = get(item, 'event.data.modelData.id');
  let versionId = get(item, 'event.data.data.version');

  const status = get(item, 'event.status');
  const isEndorsed = isTrueish(get(item, 'event.data.meta.authority'));
  const isAwerbed = isTrueish(get(item, 'event.data.meta.awerb'));
  const requiresAdminInteraction = !isEndorsed || (!isAwerbed && !actionPerformedByAdmin(item));

  if (!versionId) {
    return null;
  }

  if (status === 'resolved') {
    const transferredProject = useSelector(state => state.static.transferredProject);

    if (transferredProject) {
      // transferredProject is only set if the user has permission to view it
      // otherwise we default to the version at the outgoing establishment
      establishmentId = transferredProject.establishmentId;
      projectId = transferredProject.id;
      versionId = transferredProject.granted.id;
    }

    return (
      <div className="version-links">
        <p>
          <Link
            page="projectVersion"
            versionId={versionId}
            establishmentId={establishmentId}
            projectId={projectId}
            label={<Snippet date={format(item.createdAt, dateFormat.long)}>view.granted</Snippet>}
          />
        </p>
        <p>
          <Link
            page="projectVersion.nts"
            versionId={versionId}
            establishmentId={establishmentId}
            projectId={projectId}
            label={<Snippet date={format(item.createdAt, dateFormat.long)}>view.nts</Snippet>}
          />
        </p>
      </div>
    );
  }

  if (status === 'endorsed' || (status === 'resubmitted' && !requiresAdminInteraction)) {
    return (
      <Fragment>
        <div className="version-links">
          <p>
            <Link
              page="projectVersion"
              versionId={versionId}
              establishmentId={establishmentId}
              projectId={projectId}
              label={<Snippet date={format(item.createdAt, dateFormat.long)}>view.version</Snippet>}
            />
          </p>
        </div>
      </Fragment>
    );
  }

  return null;
}

function Comment({ changedBy, comment }) {
  return comment && (
    <div className="comment">
      {
        changedBy.id && <p className="author">{`${changedBy.firstName} ${changedBy.lastName} remarked:`}</p>
      }
      <Inset>
        <Markdown className="content">{comment}</Markdown>
      </Inset>
    </div>
  );
}

const showPplDeclarations = (item) => {
  const status = get(item, 'event.status');
  return ['endorsed', 'resubmitted'].includes(status);
};

function LogItem({ item, task }) {
  let { action } = item;
  const isExtension = isDeadlineExtension(item);
  const isRa = task.data.action === 'grant-ra';
  const isAssignment = item.eventName === 'assign';

  if (action === 'update') {
    if (isExtension) {
      action = 'deadline-extended';
    } else if (isDeadlineRemove(item)) {
      action = 'deadline-removed';
    } else if (isDeadlineReinstate(item)) {
      action = 'deadline-reinstated';
    }
  }

  return (
    <div className="log-item" id={item.id}>
      <span className="date">{format(item.createdAt, dateFormat.long)}</span>
      <Action task={task} action={action} activity={item} changedBy={item.changedBy} />
      <InspectorRecommendation item={item} />
      { isExtension && <DeadlineDetails item={item} /> }
      { isRa && <AwerbDate item={item} /> }
      { isAssignment && <Assignment item={item} />}
      <Comment changedBy={item.changedBy} comment={item.comment} />
      { showPplDeclarations(item) && <PplDeclarations task={item.event} /> }
      <DeclarationMeta item={item} />
      <ExtraProjectMeta item={item} task={task} />
    </div>
  );
}

export default function ActivityLog({ task }) {
  const [open, setOpen] = useState(false);
  const isAsru = useSelector(state => state.static.isAsru);

  function toggle(e) {
    e.preventDefault();
    setOpen(!open);
  }

  if (!task.activityLog) {
    return null;
  }

  const activityLog = isAsru ? task.activityLog : task.activityLog.filter(a => a.eventName !== 'assign');

  const latestActivity = activityLog[0];

  return (
    <div className="activity-log">
      <h2><Snippet>sticky-nav.activity</Snippet></h2>

      <LogItem key={latestActivity.id} item={latestActivity} task={task} />

      { activityLog.length > 1 &&
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
                activityLog.slice(1).map(item => (
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
