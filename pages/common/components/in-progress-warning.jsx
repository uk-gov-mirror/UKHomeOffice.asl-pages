import React, { Fragment } from 'react';

export default task => {
  return <Fragment>
    <p>This item cannot be modified as it is subject to current in-progress changes.</p>
    <p><Link page="task.read" taskId={task.id} label="View open changes" /></p>
  </Fragment>
};
