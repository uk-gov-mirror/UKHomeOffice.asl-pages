import React from 'react';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import { Form, Snippet, Header } from '@ukhomeoffice/asl-components';
import { formatDate } from '../../../../lib/utils';

export default function DeadlinePassedReason() {
  const task = useSelector(state => state.static.task);
  const deadline = get(task, 'data.deadline');
  const deadlineDate = deadline.isExtended ? deadline.extended : deadline.standard;

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <Form>
          <Header title={<Snippet>deadline.passed.title</Snippet>} />
          <p>
            <Snippet date={formatDate(deadlineDate)}>deadline.passed.summary</Snippet>
          </p>
        </Form>
      </div>
    </div>
  );
}
