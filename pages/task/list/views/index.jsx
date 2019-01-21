import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import TaskList from './tasklist';
import {
  Header,
  Snippet
} from '@asl/components';

const TaskListPage = ({ name, progress, tabs }) => (
  <Fragment>
    <Header
      title={<Snippet>title</Snippet>}
      subtitle={name}
    />
    <TaskList tabs={ tabs } progress={ progress } />
  </Fragment>
);

const mapStateToProps = ({ static: { profileName: name, progress, tabs } }) => ({ name, progress, tabs });

export default connect(mapStateToProps)(TaskListPage);
