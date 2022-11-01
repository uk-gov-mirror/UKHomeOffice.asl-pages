import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from '@asl/components';
import { showNotification } from '@asl/components/src/notification/actions';

export default function AssignTask({ task }) {
  const { user } = useSelector(state => state.static);
  const [assignedTo, setAssignedTo] = useState(task.assignedTo);
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();

  if (assignedTo) {
    return <Link page="globalProfile" label={`${assignedTo.firstName} ${assignedTo.lastName}`} profileId={assignedTo.id} />;
  }

  const assignToMe = e => {
    e.preventDefault();

    if (disabled) {
      return;
    }

    setDisabled(true);

    const params = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskId: task.id, assignedTo: user.id })
    };

    fetch(`/tasks/assign`, params)
      .then(response => response.json())
      .then(task => {
        setAssignedTo(task.data.assignedTo);
        dispatch(showNotification({ message: 'Task assigned' }));
        setDisabled(false);
      })
      .catch(() => {
        dispatch(showNotification({ message: 'There was a problem assigning the task', type: 'error' }));
        setDisabled(false);
      });

  };

  return (
    <Fragment>
      <em className="block">Unassigned</em>
      <button className="link assignedTobutton" disabled={disabled} onClick={assignToMe}><span>Assign to me</span></button>
    </Fragment>
  );
}
