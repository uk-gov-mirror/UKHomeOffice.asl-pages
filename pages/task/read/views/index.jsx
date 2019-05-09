import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  ErrorSummary,
  Link,
  Snippet,
  StickyNavAnchor,
  Header
} from '@asl/components';
import ActivityLog, { getStatus } from './activity-log';
import Pil from './pil';
import Place from './place';
import Profile from './profile';
import Role from './role';
import Project from './project';
import get from 'lodash/get';

const ExtraProjectMeta = ({ item, task }) => {
  const status = getStatus(item.eventName);
  if (status !== 'with-inspectorate') {
    return null;
  }
  const versionId = get(item, 'event.data.data.version');
  if (!versionId) {
    return null;
  }
  return <p><Link page="project.version.read" versionId={versionId} establishmentId={task.data.establishmentId} projectId={task.data.id} label="View this version"/></p>;
};

const getTaskPlayback = (task) => {
  if (task.data.model === 'pil') {
    return (
      <Pil task={task}>
        <StickyNavAnchor id="activity">
          <ActivityLog task={task} />
        </StickyNavAnchor>
      </Pil>
    );
  }
  if (task.data.model === 'place') {
    return (
      <Place task={task}>
        <StickyNavAnchor id="activity">
          <ActivityLog task={task} />
        </StickyNavAnchor>
      </Place>
    );
  }
  if (task.data.model === 'profile') {
    return (
      <Profile task={task}>
        <StickyNavAnchor id="activity">
          <ActivityLog task={task} />
        </StickyNavAnchor>
      </Profile>
    );
  }
  if (task.data.model === 'role') {
    return (
      <Role task={task}>
        <StickyNavAnchor id="activity">
          <ActivityLog task={task} />
        </StickyNavAnchor>
      </Role>
    );
  }
  if (task.data.model === 'project') {
    return (
      <Project task={task}>
        <StickyNavAnchor id="activity">
          <ActivityLog task={task} ExtraMeta={ExtraProjectMeta} />
        </StickyNavAnchor>
      </Project>
    );
  }
};

const getTitle = action => {
  let key = 'title';
  if (action === 'create') {
    key = 'createTitle';
  }
  if (action === 'delete') {
    key = 'deleteTitle';
  }
  if (action === 'update') {
    key = 'updateTitle';
  }
  try {
    return <Snippet>{key}</Snippet>;
  } catch (e) {
    return <Snippet>title</Snippet>;
  }
};

const Task = ({ task, project }) => {
  return (
    <Fragment>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <ErrorSummary />
        </div>
      </div>

      <Header title={getTitle(task.data.action)} subtitle={project && project.title} />

      { getTaskPlayback(task) }
    </Fragment>
  );
};

const mapStateToProps = ({ static: { task, project } }) => ({ task, project });

export default connect(mapStateToProps)(Task);
