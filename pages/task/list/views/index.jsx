import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import TaskList from './tasklist';
import {
  Header,
  Snippet
} from '@asl/components';

const TaskListPage = ({ name }) => (
  <Fragment>
    <Header
      title={<Snippet>title</Snippet>}
      subtitle={name}
    />
    <TaskList />
  </Fragment>
);

const mapStateToProps = ({ static: { profileName: name } }) => ({ name });

export default connect(mapStateToProps)(TaskListPage);
