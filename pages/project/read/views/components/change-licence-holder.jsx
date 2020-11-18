import React from 'react';
import { useSelector } from 'react-redux';
import { Snippet, Link } from '@asl/components';
import Subsection from './subsection';

export default function ChangeLicenceHolder() {
  const project = useSelector(state => state.model);
  const { canUpdate, openTask } = useSelector(state => state.static);

  // only shows for applications - for active licences the change licence holder function is in the start-amendment panel
  if (!openTask && canUpdate && project.status !== 'inactive') {
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
