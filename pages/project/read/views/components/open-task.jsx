import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Snippet } from '@ukhomeoffice/asl-components';
import Subsection from './subsection';

export default function OpenTask() {
  const project = useSelector(state => state.model);
  const { openTask, editable, canUpdate, asruUser, additionalAvailability } = useSelector(state => state.static);

  if (!openTask || !openTask.data || additionalAvailability) {
    return null;
  }

  if (openTask.data.initiatedByAsru && !asruUser) {
    return null;
  }

  if (editable && openTask.data.action === 'grant' && project.status !== 'inactive') {
    return null;
  }

  let type = project.status === 'inactive' ? 'application' : 'amendment';

  if (openTask.data.action === 'revoke') {
    type = 'revocation';
  }

  const status = type;

  if (openTask.data.action === 'update') {
    type = 'update-licence-holder';
  }

  if (project.status === 'inactive' && editable) {
    type = 'returned-draft';
  }

  if (!canUpdate || openTask.data.initiatedByAsru !== asruUser) {
    type = 'cannot-update';
  }

  return (
    <Subsection
      title={<Snippet status={`${status.charAt(0).toUpperCase()}${status.substring(1)}`}>{`openTask.${type}.title`}</Snippet>}
      content={<Snippet status={status}>{`openTask.${type}.description`}</Snippet>}
    >
      <Link
        page="task.read"
        taskId={openTask.id}
        className="govuk-button button-secondary"
        label={<Snippet>actions.viewTask</Snippet>}
      />
    </Subsection>
  );
}
