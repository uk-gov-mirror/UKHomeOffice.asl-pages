import React from 'react';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import { Form, Snippet, Header } from '@asl/components';

export default function DeadlinePassedReason() {
  const task = useSelector(state => state.static.task);
  const daysSinceDeadline = get(task, 'data.deadline.daysSince');

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
