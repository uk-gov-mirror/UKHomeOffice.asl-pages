import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Snippet, Panel } from '@ukhomeoffice/asl-components';
import Table from './table';

export default function RelatedTasks () {
  const workflowConnectionError = useSelector(state => state.static.workflowConnectionError);
  const datatable = useSelector(state => state.datatable);
  const hasTasks = datatable.pagination.totalCount > 0;

  if (workflowConnectionError) {
    return (
      <Panel>
        <h2>
          <Snippet>relatedTasks.unavailable</Snippet>
        </h2>
      </Panel>
    );
  }

  return (
    <Fragment>
      <hr />
      <h2>Related tasks</h2>
      {
        hasTasks
          ? <Table />
          : <p><Snippet>relatedTasks.noTasks</Snippet></p>
      }
    </Fragment>
  );
}
