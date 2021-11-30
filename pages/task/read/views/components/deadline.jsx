import React from 'react';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import { Link, Snippet, Details } from '@asl/components';
import { dateFormat } from '../../../../../constants';
import { formatDate } from '../../../../../lib/utils';

export default function Deadline({ task }) {
  const isInspector = useSelector(state => state.static.isInspector);
  const deadline = get(task, 'data.deadline');
  const isExtended = get(deadline, 'isExtended', false);
  const deadlineDate = get(deadline, isExtended ? 'extended' : 'standard');

  if (!deadlineDate) {
    return null;
  }

  return (
    <div className="deadline">
      <h3><Snippet>deadline.title</Snippet> {formatDate(deadlineDate, dateFormat.long)}</h3>

      {
        deadline.daysSince >= 0 &&
          <p className="deadline-passed gutter">
            {
              deadline.daysSince === 0 && <Snippet>deadline.today</Snippet>
            }
            {
              deadline.daysSince > 0 &&
                <Snippet days={deadline.daysSince}>{`deadline.passed.${deadline.daysSince > 1 ? 'plural' : 'singular'}`}</Snippet>
            }
          </p>
      }

      { isInspector && deadline && deadline.isExtendable &&
        <div className="gutter">
          <Details summary="Extend deadline">
            <p><Snippet>deadline.hint</Snippet></p>
            <Link
              page="task.read.extend"
              taskId={task.id}
              label={<Snippet>deadline.extend.button</Snippet>}
              className="govuk-button button-secondary"
            />
          </Details>
        </div>
      }
    </div>
  );
}
