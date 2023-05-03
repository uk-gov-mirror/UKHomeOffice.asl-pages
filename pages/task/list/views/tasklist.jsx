import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import { Acronym, Snippet, LinkFilter, FilterSummary, Panel, Tabs, LinkFilterList } from '@ukhomeoffice/asl-components';
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
  const pelFilterActive = get(filters, 'active.licence', []).includes('pel');

  const filterOpts = [
    {
      label: <Snippet>filters.progress.label</Snippet>,
      prop: 'progress',
      formatter: filter => <Snippet>{`filters.progress.options.${filter}`}</Snippet>,
      options: progressOptions,
      showAll: false
    }
  ];

  if (hasTasks) {
    filterOpts.push({
      label: <Snippet>filters.licence.label</Snippet>,
      prop: 'licence',
      formatter: filter => <Acronym>{selectivelyUppercase(filter)}</Acronym>,
      append: ['pil', 'ppl', 'pel', 'profile']
    });
  }

  if (pplFilterActive) {
    filterOpts.push({
      label: <Snippet>filters.pplType.label</Snippet>,
      prop: 'pplType',
      formatter: filter => <Snippet>{`filters.pplType.options.${filter}`}</Snippet>,
      append: ['applications', 'amendments', 'revocations', 'transfers', 'changeLicenceHolder', 'continuations', 'hasDeadline', 'ra']
    });
  }

  if (pelFilterActive) {
    filterOpts.push({
      label: <Snippet>filters.pelType.label</Snippet>,
      prop: 'pelType',
      formatter: filter => <Snippet>{`filters.pelType.options.${filter}`}</Snippet>,
      append: ['places', 'pelh', 'roles']
    });
  }

  return (
    <div className="task-filters">
      <p>Filter results:</p>
      <LinkFilterList filters={filterOpts} />
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
  const { filters, pagination } = useSelector(state => state.datatable);
  const progress = get(filters, 'active.progress[0]') || progressOptions[0];
  const hasTasks = pagination.totalCount > 0;

  // modify the updatedAt column label when looking at completed tasks
  const formatters = (progress === 'completed') ? { updatedAt: { label: 'Completed' } } : {};

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
            <Table formatters={formatters} />
          </Fragment>

          : <Fragment>
            <p><Snippet>{ `no-tasks.${progress}` }</Snippet></p>
            <hr />
          </Fragment>
      }
    </Fragment>
  );
}
