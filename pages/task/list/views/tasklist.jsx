import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import get from 'lodash/get';
import { formatDate } from '../../../../lib/utils';
import { dateFormat } from '../../../../constants';
import {
  Acronym,
  Tabs,
  Datatable,
  Snippet,
  Link,
  LinkFilter,
  FilterSummary,
  Panel,
  Countdown
} from '@asl/components';

const good = ['resolved'];
const bad = ['rejected', 'withdrawn'];

const formatters = {
  updatedAt: {
    format: date => formatDate(date, dateFormat.medium)
  },
  establishment: {
    format: (establishment, model) => establishment || '-'
  },
  licence: {
    format: licence => {
      if (licence === 'pil') {
        return 'PIL';
      }
      if (licence === 'project') {
        return 'PPL';
      }
      if (licence === 'place' || licence === 'role' || licence === 'establishment') {
        return 'PEL';
      }
      return '-';
    }
  },
  status: {
    format: (status, model) => {
      const deadline = get(model, 'deadline');
      const className = classnames({ badge: true, complete: good.includes(status), rejected: bad.includes(status) });
      return (
        <Fragment>
          <span className={ className }><Snippet>{ `status.${status}.state` }</Snippet></span>
          {
            deadline && <Countdown expiry={deadline} unit="day" showUrgent={9} />
          }
        </Fragment>
      );
    }
  },
  type: {
    format: (type, model) => {
      const id = get(model, 'id');
      const licence = get(model, 'data.model');
      const status = get(model, 'data.modelData.status');

      if (type === 'grant' && status === 'active') {
        type = 'update';
      }

      let contextLabel = null;
      let title = null;
      if (licence === 'project') {
        title = get(model, 'data.modelData.title') || 'Untitled project';
      }

      switch (licence) {
        case 'project':
        case 'pil':
        case 'role':
        case 'profile':
          const subject = get(model, 'data.subject');
          if (subject) {
            contextLabel = `${subject.firstName} ${subject.lastName}`;
          }
          break;

        case 'place':
          const placeName = get(model, 'data.modelData.name') || get(model, 'data.data.name');
          if (placeName) {
            contextLabel = placeName;
          }
          break;
      }

      return (
        <div title={title}>
          <Link
            page="task.read"
            taskId={id}
            // adding optional snippet for backwards compatibility
            // as some task types wont have content defined.
            label={<Snippet optional>{`tasks.${licence}.${type}`}</Snippet>}
          />
          {
            contextLabel &&
              <Fragment>
                <br />
                <span>{contextLabel}</span>
              </Fragment>
          }
        </div>
      );
    }
  }
};

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
          <Datatable formatters={formatters} className="tasklist" />
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
