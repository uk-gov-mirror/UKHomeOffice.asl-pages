import React, { Fragment } from 'react';
import classnames from 'classnames';
import get from 'lodash/get';
import format from 'date-fns/format';
import isBefore from 'date-fns/is_before';
import differenceInDays from 'date-fns/difference_in_calendar_days';
import { dateFormat } from '../../../../constants';
import { Snippet, Link } from '@asl/components';

const good = ['resolved'];
const bad = ['rejected', 'discarded-by-applicant'];

const Deadline = ({ task }) => {
  if (!task.withASRU) {
    return <p className="govuk-hint">No deadline</p>;
  }

  const activeDeadline = task.activeDeadline;

  if (activeDeadline) {
    const now = new Date();
    const statutoryDeadline = get(task, 'data.deadline');
    const isExtended = get(statutoryDeadline, 'isExtended', false);
    const statutoryDate = get(statutoryDeadline, isExtended ? 'extended' : 'standard');
    const overdue = isBefore(activeDeadline, now);
    const urgent = overdue || differenceInDays(activeDeadline, now) <= 9;

    return (
      <span className={classnames('notice', { urgent })}>
        {
          overdue
            ? <span title={format(activeDeadline, dateFormat.medium)}>Overdue</span>
            : <span>{format(activeDeadline, dateFormat.medium)}</span>
        }
        {
          activeDeadline === statutoryDate &&
            <Fragment><br/><span>(statutory)</span></Fragment>
        }
      </span>
    );
  }

  return <p className="govuk-hint">No deadline</p>;
};

export default {
  updatedAt: {
    format: date => date ? format(date, dateFormat.medium) : '-'
  },
  establishment: {
    format: (establishment, model) => establishment || '-'
  },
  status: {
    format: (status, task) => {
      const isRop = (get(task, 'data.model') || get(task, 'model')) === 'rop';
      const className = classnames({ badge: true, complete: good.includes(status || isRop), rejected: bad.includes(status) });

      if (isRop) {
        status = 'resubmitted';
      }

      return (
        <span className={ className }><Snippet>{ `status.${status}.state` }</Snippet></span>
      );
    }
  },
  activeDeadline: {
    format: (deadline, task) => {
      return (
        <Deadline task={task} />
      );
    }
  },
  type: {
    format: (type, task) => {
      const id = get(task, 'id');
      const status = get(task, 'data.modelData.status') || get(task, 'modelStatus');
      const labelParams = {};
      let licence = get(task, 'data.model') || get(task, 'model');

      if (licence === 'trainingPil') {
        licence = 'pil';
      }

      if (type === 'grant' && status === 'active') {
        type = 'update';
      }

      let contextLabel = null;
      let title = null;
      if (licence === 'project') {
        title = get(task, 'data.modelData.title') || get(task, 'projectTitle') || 'Untitled project';
      }

      if (licence === 'role') {
        labelParams.type = get(task, 'data.data.type', '').toUpperCase();
      }

      switch (licence) {
        case 'project':
        case 'pil':
        case 'role':
        case 'profile':
          const subject = get(task, 'data.subject') || get(task, 'subject');
          if (subject) {
            contextLabel = `${subject.firstName} ${subject.lastName}`;
          }
          break;

        case 'place':
          const placeName = get(task, 'data.modelData.name') || get(task, 'data.data.name') || get(task, 'placeName');
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
            label={<Snippet {...labelParams} optional>{`tasks.${licence}.${type}`}</Snippet>}
          />
          {
            contextLabel && <span className="block smaller">{contextLabel}</span>
          }
        </div>
      );
    }
  },
  assignedTo: {
    format: assignedTo => {
      if (!assignedTo) {
        return <em>Unassigned</em>;
      }
      return <Link page="globalProfile" label={`${assignedTo.firstName} ${assignedTo.lastName}`} profileId={assignedTo.id} />;
    }
  }
};
