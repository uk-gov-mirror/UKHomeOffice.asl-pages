import React from 'react';
import { useSelector } from 'react-redux';
import { Snippet, Link } from '@asl/components';
import Subsection from './subsection';
import Collaborators from '../../../components/collaborators';

export default function ManageAccess() {
  const project = useSelector(state => state.model);
  const { canManageAccess, additionalAvailability } = useSelector(state => state.static);

  if (!canManageAccess) {
    return null;
  }

  const aaMatchesProjectStatus = project.status === 'inactive'
    ? (!additionalAvailability || additionalAvailability.status === 'draft')
    : (!additionalAvailability || additionalAvailability.status === 'active');

  if (!aaMatchesProjectStatus) {
    return null;
  }

  return (
    <Subsection
      title={<Snippet>manageAccess.title</Snippet>}
      content={<Snippet>manageAccess.content</Snippet>}
    >
      <p>
        <Link page="project.addUser" label={<Snippet>manageAccess.action</Snippet>} />
      </p>
      {
        !!project.collaborators.length && <Collaborators collaborators={project.collaborators} />
      }
    </Subsection>
  );
}
