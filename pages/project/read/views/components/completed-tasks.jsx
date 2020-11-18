import React from 'react';
import Table from '../../../../task/list/views/table';
import Subsection from '../components/subsection';

export default function CompletedTasks () {
  return (
    <Subsection
      title="History"
      content="View all past activity on this project including links to old licence versions."
      className="completed-tasks"
    >
      <Table />
    </Subsection>
  );
}
