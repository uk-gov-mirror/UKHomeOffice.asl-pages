import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import TaskList from './tasklist';
import {
  Header,
  Snippet
} from '@ukhomeoffice/asl-components';

const TaskListPage = ({ profileName }) => (
  <Fragment>
    <Header
      title={<Snippet>title</Snippet>}
      subtitle={profileName}
    />
    <TaskList />
  </Fragment>
);

export default connect(({ static: { profileName } }) => ({ profileName }))(TaskListPage);
