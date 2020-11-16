import React from 'react';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import PreviousVersions from '../components/previous-versions';
import CompletedTasks from '../components/completed-tasks';

export default function History() {
  const workflowConnectionError = useSelector(state => state.static.workflowConnectionError);
  const datatable = useSelector(state => state.datatable);
  const hasHistory = get(datatable, 'pagination.totalCount') > 0;

  return (
    <div className="project-history">
      <PreviousVersions />
      { !workflowConnectionError && hasHistory && <CompletedTasks /> }
    </div>
  );
}
