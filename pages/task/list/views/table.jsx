import React, { Fragment } from 'react';
import classnames from 'classnames';
import get from 'lodash/get';
import { formatDate } from '../../../../lib/utils';
import { dateFormat } from '../../../../constants';
import {
  Datatable,
  Snippet,
  Link,
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
    format: (licence, task) => {
      if (licence === 'pil') {
        return (
          <Fragment>
            <span>PIL</span>
            <span className="block smaller">{get(task, 'data.modelData.licenceNumber')}</span>
          </Fragment>
        );
      }
      if (licence === 'project') {
        return (
          <Fragment>
            <span>PPL</span>
            <span className="block smaller">{get(task, 'data.modelData.licenceNumber')}</span>
          </Fragment>
        );
      }
      if (licence === 'place' || licence === 'role' || licence === 'establishment') {
        return 'PEL';
      }
      return '-';
    }
  },
  status: {
    format: (status, model) => {
      const deadline = get(model, 'data.deadline');
      const isExtended = get(deadline, 'isExtended', false);
      const deadlineDate = get(deadline, isExtended ? 'extended' : 'standard');
      const continuation = get(model, 'data.continuation') && get(model, 'data.modelData.status') === 'inactive';
      const className = classnames({ badge: true, complete: good.includes(status), rejected: bad.includes(status) });

      return (
        <Fragment>
          <span className={ className }><Snippet>{ `status.${status}.state` }</Snippet></span>
          {
            deadline && <Countdown expiry={deadlineDate} unit="day" showUrgent={9} />
          }
          {
            continuation && <span className="notice"><Snippet>continuation</Snippet></span>
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
            contextLabel && <span className="block smaller">{contextLabel}</span>
          }
        </div>
      );
    }
  }
};

export default function () {
  return <Datatable formatters={formatters} className="tasklist" />;
}
