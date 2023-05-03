import React from 'react';
import { useSelector } from 'react-redux';
import { Snippet, Link } from '@ukhomeoffice/asl-components';
import Subsection from './subsection';
import Collaborators from '../../../components/collaborators';

export default function ManageAccess() {
  const project = useSelector(state => state.model);
  const { canManageAccess } = useSelector(state => state.static);

  if (!canManageAccess) {
    return null;
  }

  return (
    <Subsection
      title={<Snippet>manageAccess.title</Snippet>}
      content={<Snippet>{`manageAccess.content.${project.status === 'inactive' ? 'application' : 'granted'}`}</Snippet>}
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
