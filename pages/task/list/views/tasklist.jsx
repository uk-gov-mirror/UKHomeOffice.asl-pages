import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import { Acronym, Snippet, LinkFilter, FilterSummary, Panel, Tabs } from '@asl/components';
import Table from './table';

const selectivelyUppercase = filter => {
  return filter === 'profile' ? 'Profile' : filter.toUpperCase();
};

function LicenceTypeFilter({ label }) {
  return (
    <LinkFilter
      prop="licence"
      label={label || <Snippet>filters.licence.label</Snippet>}
      formatter={filter => <Acronym>{selectivelyUppercase(filter)}</Acronym>}
      append={['pil', 'ppl', 'pel', 'profile']}
    />
  );
}

function TaskFilters({ hasTasks, progressOptions }) {
  const filters = useSelector(state => state.datatable.filters);
  const pplFilterActive = get(filters, 'active.licence', []).includes('ppl');

  return (
    <div className="task-filters">
      <p>Filter results:</p>
      <LinkFilter
        label={<Snippet>filters.progress.label</Snippet>}
        prop="progress"
        formatter={filter => <Snippet>{`filters.progress.options.${filter}`}</Snippet>}
        options={progressOptions}
        showAll={false}
      />

      { hasTasks && <LicenceTypeFilter /> }

      {
        pplFilterActive &&
          <LinkFilter
            label={<Snippet>filters.pplType.label</Snippet>}
            prop="pplType"
            formatter={filter => <Snippet>{`filters.pplType.options.${filter}`}</Snippet>}
            append={['applications', 'amendments', 'transfers', 'continuations', 'hasDeadline', 'ra']}
          />
      }
    </div>
  );
}

function TaskTabs({ tabs, selected, hasTasks }) {
  return (
    <Fragment>
      {
        !!tabs.length && <Tabs active={selected}>
          { tabs.map(tab => <a key={tab} href={`?progress=${tab}`}><Snippet>{ `tabs.${tab}` }</Snippet></a>) }
        </Tabs>
      }
      { hasTasks && <LicenceTypeFilter label="Filter by" /> }
    </Fragment>
  );
}

export default function Tasklist() {
  const { workflowConnectionError, isAsruUser, progressOptions = [] } = useSelector(state => state.static);
  const taskCount = useSelector(state => state.datatable.pagination.totalCount);
  const progress = useSelector(state => state.static.progress) || progressOptions[0];
  const hasTasks = taskCount > 0;

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
      {
        isAsruUser
          ? <TaskFilters hasTasks={hasTasks} progressOptions={progressOptions} />
          : <TaskTabs hasTasks={hasTasks} tabs={progressOptions} selected={progressOptions.indexOf(progress)} />
      }

      {
        hasTasks
          ? <Fragment>
            <div className="table-heading">
              <FilterSummary resultType="tasks" />
            </div>
            <Table />
          </Fragment>

          : <Fragment>
            <p><Snippet>{ `no-tasks.${progress}` }</Snippet></p>
            <hr />
          </Fragment>
      }
    </Fragment>
  );
}
