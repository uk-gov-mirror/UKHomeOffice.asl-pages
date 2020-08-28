import React from 'react';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import { Link, Snippet, Details } from '@asl/components';
import { dateFormat } from '../../../../../constants';
import { formatDate, daysSinceDate } from '../../../../../lib/utils';

export default function Deadline({ task }) {
  const isInspector = useSelector(state => state.static.isInspector);
  const isExtended = get(task, 'data.deadline.isExtended', false);
  const deadline = get(task, 'data.deadline');
  const deadlineDate = get(deadline, isExtended ? 'extended' : 'standard');

  if (!deadlineDate) {
    return null;
  }

  const daysSinceDeadline = daysSinceDate(deadlineDate); // will be negative until deadline day

  return (
    <div className="deadline">
      <h3><Snippet>deadline.title</Snippet> {formatDate(deadlineDate, dateFormat.long)}</h3>

      {
        daysSinceDeadline >= 0 &&
          <p className="deadline-passed">
            {
              daysSinceDeadline === 0 && <Snippet>deadline.today</Snippet>
            }
            {
              daysSinceDeadline > 0 &&
                <Snippet days={daysSinceDeadline}>{`deadline.passed.${daysSinceDeadline > 1 ? 'plural' : 'singular'}`}</Snippet>
            }
          </p>
      }

      { isInspector && deadline && deadline.isExtendable &&
        <Details summary="Extend deadline">
          <p><Snippet>deadline.hint</Snippet></p>
          <Link
            page="task.read.extend"
            taskId={task.id}
            label={<Snippet>deadline.extend.button</Snippet>}
            className="govuk-button button-secondary"
          />
        </Details>
      }
    </div>
  );
}
