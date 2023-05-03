import React from 'react';
import { useSelector } from 'react-redux';
import { Snippet } from '@ukhomeoffice/asl-components';
import { Button } from '@ukhomeoffice/react-components';
import Subsection from './subsection';

const confirmSubmission = message => e => {
  e.preventDefault();

  if (window.confirm(message)) {
    e.target.submit();
  }
};

export default function DiscardStub() {
  const project = useSelector(state => state.model);
  const { url, confirmMessage, canUpdateStub, additionalAvailability } = useSelector(state => state.static);

  // legacy stubs can be discarded at any point
  if (!project.isLegacyStub || !canUpdateStub || additionalAvailability) {
    return null;
  }

  return (
    <Subsection
      title={<Snippet>discard.stub.title</Snippet>}
      content={<Snippet>discard.stub.description</Snippet>}
    >
      <form method="POST" action={`${url}/delete/stub`} onSubmit={confirmSubmission(confirmMessage)}>
        <Button className="button-warning">
          <Snippet>actions.discard.stub</Snippet>
        </Button>
      </form>
    </Subsection>
  );
}
