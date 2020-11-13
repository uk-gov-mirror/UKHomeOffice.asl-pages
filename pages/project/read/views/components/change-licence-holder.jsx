import React from 'react';
import { useSelector } from 'react-redux';
import { Snippet, Link } from '@asl/components';
import Subsection from './subsection';

export default function ChangeLicenceHolder() {
  const project = useSelector(state => state.model);
  const { canUpdate, asruLicensing, openTask } = useSelector(state => state.static);

  const isEditable = project.status === 'inactive' || project.status === 'active';
  const canChangeLicenceHolder = !openTask && canUpdate && isEditable && (!project.isLegacyStub || (project.isLegacyStub && asruLicensing));

  if (!canChangeLicenceHolder) {
    return null;
  }

  return (
    <Subsection
      title={<Snippet>changeLicenceHolder.title</Snippet>}
      content={<Snippet>changeLicenceHolder.description</Snippet>}
    >
      <p><Link page="project.updateLicenceHolder" label={<Snippet>changeLicenceHolder.link</Snippet>} /></p>
    </Subsection>
  );
}
