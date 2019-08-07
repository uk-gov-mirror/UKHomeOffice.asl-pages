import React, { Fragment } from 'react';
import { Link } from '@asl/components';

export default ({ task }) => {
  if (task.action === 'failed') {
    return <p>Due to a problem with the service this item cannot be edited. Please try again later.</p>;
  }
  return (
    <Fragment>
      <p>This item cannot be edited as it is currently being amended.</p>
      <p><Link page="task.read" taskId={task.id} label="View task" /></p>
    </Fragment>
  );
};
