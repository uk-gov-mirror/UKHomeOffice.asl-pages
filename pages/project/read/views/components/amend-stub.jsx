import React from 'react';
import { useSelector } from 'react-redux';
import { Snippet } from '@ukhomeoffice/asl-components';
import { Button } from '@ukhomeoffice/react-components';
import Subsection from './subsection';

export default function AmendStub() {
  const project = useSelector(state => state.model);
  const { canUpdateStub, additionalAvailability } = useSelector(state => state.static);

  if (!project.isLegacyStub || !canUpdateStub || additionalAvailability) {
    return null;
  }

  return (
    <Subsection
      title={<Snippet>amendStub.title</Snippet>}
      content={<Snippet>amendStub.description</Snippet>}
    >
      <form method="POST">
        <Button className="button-secondary">
          <Snippet>actions.amendStub</Snippet>
        </Button>
      </form>
    </Subsection>
  );
}
