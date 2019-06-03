import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  ErrorSummary,
  Link,
  Snippet,
  StickyNavAnchor,
  Header,
  Form
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

const Task = ({ task, project }) => {
  let action = task.data.action;
  if (action === 'grant' && task.type === 'amendment') {
    action = 'update';
  }
  return (
    <Fragment>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <ErrorSummary />
        </div>
      </div>

      <Header
        title={<Snippet type={task.type}>title</Snippet>}
        subtitle={<Snippet>{`tasks.${task.data.model}.${action}`}</Snippet>}
      />
      {
        project && <h3>{project.title || 'Untitled project'}</h3>
      }
      {
        task.nextSteps.length > 0
          ? <Form detachFields>{getTaskPlayback(task)}</Form>
          : getTaskPlayback(task)
      }
    </Fragment>
  );
};

const mapStateToProps = ({ static: { task, project } }) => ({ task, project });

export default connect(mapStateToProps)(Task);
