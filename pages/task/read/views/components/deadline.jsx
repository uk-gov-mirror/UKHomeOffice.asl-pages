import React from 'react';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import { Link, Snippet, Details } from '@asl/components';
import { dateFormat } from '../../../../../constants';
import { formatDate } from '../../../../../lib/utils';

export default function Deadline({ task }) {
  const isInspector = useSelector(state => state.static.isInspector);
  const isExtended = get(task, 'data.deadline.isExtended', false);
  const deadline = get(task, 'data.deadline');
  const deadlineDate = get(deadline, isExtended ? 'extended' : 'standard');

  return (
    <div className="deadline">
      <h3>Statutory deadline: { deadlineDate ? formatDate(deadlineDate, dateFormat.long) : 'Not yet set' }</h3>

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
