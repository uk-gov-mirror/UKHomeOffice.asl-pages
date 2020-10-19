import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Acronym,
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

const StatusFilters = ({ tabs, progress }) => {
  if (!tabs.length) {
    return null;
  }

  return (
    <div className="link-filter no-margin">
      <label>Status:</label>
      <ul>
        {
          tabs.map(tab => (
            <li key={tab}>
              {
                progress === tab
                  ? <Snippet>{ `tabs.${tab}` }</Snippet>
                  : <a key={tab} href={`?progress=${tab}`}><Snippet>{ `tabs.${tab}` }</Snippet></a>
              }
            </li>
          ))
        }
      </ul>
    </div>
  );
};

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

  return (
    <Fragment>
      <StatusFilters tabs={tabs} progress={progress} />
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
