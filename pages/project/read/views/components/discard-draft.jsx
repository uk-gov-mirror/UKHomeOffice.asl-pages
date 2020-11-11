import React from 'react';
import { useSelector } from 'react-redux';
import { Snippet } from '@asl/components';
import { Button } from '@ukhomeoffice/react-components';
import Subsection from './subsection';

const confirmSubmission = message => e => {
  e.preventDefault();

  if (window.confirm(message)) {
    e.target.submit();
  }
};

export default function DiscardDraft() {
  const project = useSelector(state => state.model);
  const { openTask, url, confirmMessage, asruUser } = useSelector(state => state.static);

  // draft project without open task can be discarded by establishment
  if (project.status !== 'inactive' || openTask || asruUser) {
    return null;
  }

  return (
    <Subsection
      title={<Snippet>discard.draft.title</Snippet>}
      content={<Snippet>discard.draft.description</Snippet>}
    >
      <form method="POST" action={`${url}/delete/draft`} onSubmit={confirmSubmission(confirmMessage)}>
        <Button className="button-warning">
          <Snippet>actions.discard.draft</Snippet>
        </Button>
      </form>
    </Subsection>
  );
}
