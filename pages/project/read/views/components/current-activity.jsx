import React from 'react';
import { useSelector } from 'react-redux';
import Subsection from './subsection';
import formatters from '../../../../task/list/formatters';

const format = (type, value, task) => {
  return formatters[type].format(value, task);
};

export default function CurrentActivity() {
  const project = useSelector(state => state.model);
  const { additionalAvailability, workflowConnectionError, showRelatedTasks } = useSelector(state => state.static);

  if (additionalAvailability || !showRelatedTasks) {
    return null;
  }

  return (
    <Subsection title="Current activity" className="current-activity">
      {
        workflowConnectionError &&
          <p><em>There was a problem fetching open tasks.</em></p>
      }

      {
        !workflowConnectionError && project.openTasks.length === 0 &&
          <p><em>Nothing in progress just now.</em></p>
      }

      {
        !workflowConnectionError && project.openTasks.length > 0 &&
          <table className="govuk-table tasklist">
            <thead>
              <tr>
                <th>Last changed</th>
                <th>Establishment</th>
                <th>Licence</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {
                project.openTasks.map(task => (
                  <tr key={task.id}>
                    <td>{format('updatedAt', task.updatedAt, task)}</td>
                    <td>{format('establishment', task.data.establishment.name, task)}</td>
                    <td>{format('licence', task.data.model, task)}</td>
                    <td>{format('type', task.data.action, task)}</td>
                    <td>{format('status', task.status, task)}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
      }
    </Subsection>
  );
}
