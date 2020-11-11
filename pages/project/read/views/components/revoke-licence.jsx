import React from 'react';
import { useSelector } from 'react-redux';
import { Snippet, Link } from '@asl/components';
import Subsection from './subsection';

export default function RevokeLicence() {
  const project = useSelector(state => state.model);
  const { openTask, canRevoke, asruUser } = useSelector(state => state.static);

  if (openTask || !canRevoke || project.status !== 'active') {
    return null;
  }

  if (project.isLegacyStub && !asruUser) {
    return null;
  }

  return (
    <Subsection
      title={<Snippet>revoke.title</Snippet>}
      content={<Snippet>revoke.description</Snippet>}
    >
      <Link
        page="project.revoke"
        className="govuk-button button-warning"
        label={<Snippet>actions.revoke</Snippet>}
      />
    </Subsection>
  );
}
