import React from 'react';
import { useSelector } from 'react-redux';
import { Snippet } from '@asl/components';
import Subsection from './subsection';

export default function UserCannotEdit() {
  const project = useSelector(state => state.model);
  const { asruUser } = useSelector(state => state.static);

  if (project.status === 'inactive') {
    return null;
  }

  const ungrantedVersion = ['draft', 'submitted'].includes(project.versions[0].status) ? project.versions[0] : null;

  if (ungrantedVersion && (ungrantedVersion.asruVersion !== asruUser)) {
    return <Subsection
      title={<Snippet>{`start-amendment.title.continue`}</Snippet>}
      content={<Snippet>{`start-amendment.description.${asruUser ? 'asruCannotContinue' : 'establishmentCannotContinue'}`}</Snippet>}
    />;
  }

  return null;
}
