import React from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import { Snippet, Link } from '@asl/components';
import Subsection from './subsection';

export default function SuspendReinstateLicence() {
  const project = useSelector(state => state.model);
  const { canSuspend } = useSelector(state => state.static);
  const isSuspended = !!project.suspendedDate;
  const action = isSuspended ? 'reinstate' : 'suspend';

  if (!canSuspend || project.status !== 'active') {
    return null;
  }

  return (
    <Subsection
      title={<Snippet>{`${action}.title`}</Snippet>}
      content={<Snippet>{`${action}.description`}</Snippet>}
    >
      <Link
        page={`project.${action}`}
        className={classnames('govuk-button', action === 'suspend' ? 'button-suspend' : 'button-primary')}
        projectId={project.id}
        establishmentId={project.establishmentId}
        label={<Snippet>{`actions.${action}`}</Snippet>}
      />
    </Subsection>
  );
}
