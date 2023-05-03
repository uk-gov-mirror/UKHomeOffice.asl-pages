import React from 'react';
import { Link, Snippet } from '@ukhomeoffice/asl-components';
import namedRoles from '../content/named-roles';

const OpenTasks = ({ roleTasks }) => {
  if (roleTasks.length < 1) {
    return null;
  }

  return (
    <div className="open-role-tasks">
      <h3><Snippet>openTasks.title</Snippet></h3>
      <p><Snippet>{`openTasks.description.${roleTasks.length === 1 ? 'single' : 'multiple'}`}</Snippet></p>
      <ul>
        {
          roleTasks.map(task => (
            <li key={task.type}>
              {namedRoles[task.type]} <Link page="task.read" taskId={task.id} label={<Snippet>openTasks.link</Snippet>} />
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default OpenTasks;
