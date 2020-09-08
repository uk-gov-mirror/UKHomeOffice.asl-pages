import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Snippet, Header } from '@asl/components';

export default function DeadlinePassedReason() {
  const daysSinceDeadline = useSelector(state => state.static.daysSinceDeadline);

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <Form>
          <Header title={<Snippet>deadline.passed.title</Snippet>} />
          <p>
            <Snippet days={daysSinceDeadline}>{`deadline.passed.summary.${daysSinceDeadline > 1 ? 'plural' : 'singular'}`}</Snippet>
          </p>
        </Form>
      </div>
    </div>
  );
}
