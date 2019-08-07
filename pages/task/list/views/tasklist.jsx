import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import get from 'lodash/get';
import { formatDate } from '../../../../lib/utils';
import { dateFormat } from '../../../../constants';
import {
  Tabs,
  Datatable,
  Snippet,
  Link,
  Panel
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
    format: status => {
      const className = classnames({ badge: true, complete: good.includes(status), rejected: bad.includes(status) });
      return <span className={ className }><Snippet>{ `status.${status}.state` }</Snippet></span>;
    }
  },
  type: {
    format: (type, model) => {
      const id = get(model, 'id');
      const licence = get(model, 'data.model');
      const subject = get(model, 'data.subject');
      const status = get(model, 'data.modelData.status');
      if (type === 'grant' && status === 'active') {
        type = 'update';
      }

      return (
        <Fragment>
          <Link
            page="task.read"
            taskId={id}
            // adding optional snippet for backwards compatibility
            // as some task types wont have content defined.
            label={<Snippet optional>{`tasks.${licence}.${type}`}</Snippet>}
          />
          {
            subject && (
              <Fragment>
                <br />
                <span>{`${subject.firstName} ${subject.lastName}`}</span>
              </Fragment>
            )
          }
        </Fragment>
      );
    }
  }
};

const Tasklist = ({
  workflowConnectionError,
  tabs = [],
  progress
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
      <Datatable formatters={formatters} className="tasklist" />
    </Fragment>
  );
};

export default connect(({ static: { workflowConnectionError, tabs, progress } }) => ({ workflowConnectionError, tabs, progress }))(Tasklist);
