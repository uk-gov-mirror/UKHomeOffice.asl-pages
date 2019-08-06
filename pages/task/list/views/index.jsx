import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import TaskList from './tasklist';
import {
  Header,
  Snippet
} from '@asl/components';
import TaskListUnavilable from './tasklist-unavailable';

const TaskListPage = ({ name, progress, tabs, workflowConnectionError }) => (
  <Fragment>
    <Header
      title={<Snippet>title</Snippet>}
      subtitle={name}
    />
    {
      workflowConnectionError
        ? <TaskListUnavilable />
        : <TaskList tabs={ tabs } progress={ progress } />
    }
  </Fragment>
);

const mapStateToProps = ({ static: { profileName: name, progress, tabs, workflowConnectionError } }) => ({ name, progress, tabs, workflowConnectionError });

export default connect(mapStateToProps)(TaskListPage);
