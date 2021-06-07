import React from 'react';
import { useSelector } from 'react-redux';
import { Snippet, Link } from '@asl/components';
import Collaborators from '../../../collaborators/components/collaborators';

export default function ManageAccess() {
  const project = useSelector(state => state.model);
  const { canManageAccess } = useSelector(state => state.static);

  if (!canManageAccess) {
    return null;
  }

  return (
    <div className="manageAccess">
      <h2><Snippet>manageAccess.title</Snippet></h2>
      <p><Snippet>{`manageAccess.content.${project.status === 'inactive' ? 'application' : 'granted'}`}</Snippet></p>
      <p>
        <Link page="project.collaborators.create" className="govuk-button" label={<Snippet>manageAccess.action</Snippet>} />
      </p>
      {
        !!project.collaborators.length && <Collaborators collaborators={project.collaborators} />
      }
    </div>
  );
}
