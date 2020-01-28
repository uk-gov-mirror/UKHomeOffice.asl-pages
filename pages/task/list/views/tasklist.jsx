import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Acronym,
  Tabs,
  Snippet,
  LinkFilter,
  FilterSummary,
  Panel
} from '@asl/components';

import Table from './table';

const selectivelyUppercase = filter => {
  return filter === 'profile' ? 'Profile' : filter.toUpperCase();
};

const Filters = () => (
  <Fragment>
    <LinkFilter
      prop="licence"
      formatter={filter => <Acronym>{selectivelyUppercase(filter)}</Acronym>}
      append={['pil', 'ppl', 'pel', 'profile']}
    />
    <div className="table-heading">
      <FilterSummary />
    </div>
  </Fragment>
);

const Tasklist = ({
  workflowConnectionError,
  tabs = [],
  progress,
  hasTasks
}) => {
  if (workflowConnectionError) {
    return (
      <Panel>
        <h2>
          <Snippet>tasklist-unavailable</Snippet>
        </h2>
      </Panel>
    );
  }
  progress = progress || tabs[0];
  const selected = tabs.indexOf(progress);
  return (
    <Fragment>
      {
        !!tabs.length && <Tabs active={selected}>
          { tabs.map(tab => <a key={tab} href={`?progress=${tab}`}><Snippet>{ `tabs.${tab}` }</Snippet></a>) }
        </Tabs>
      }
      {
        hasTasks && <Fragment>
          <Filters />
          <Table />
        </Fragment>
      }
      {
        !hasTasks && <p><Snippet>{ `no-tasks.${progress}` }</Snippet></p>
      }
    </Fragment>
  );
};

const mapStateToProps = ({
  static: {
    workflowConnectionError,
    tabs,
    progress
  },
  datatable: {
    pagination: {
      totalCount: taskCount
    }
  }
}) => {
  return {
    workflowConnectionError,
    tabs,
    progress,
    hasTasks: taskCount > 0
  };
};

export default connect(mapStateToProps)(Tasklist);
