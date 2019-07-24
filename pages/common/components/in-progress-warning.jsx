import React, { Fragment } from 'react';
import { Link } from '@asl/components';

export default ({ task }) => {
  return <Fragment>
    <p>This item cannot be edited as it is currently being amended.</p>
    <p><Link page="task.read" taskId={task.id} label="View task" /></p>
  </Fragment>;
};
