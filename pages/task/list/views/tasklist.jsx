import React, { Fragment } from 'react';
import get from 'lodash/get';
import format from 'date-fns/format';
import { dateFormat } from '../../../../constants';
import {
  Datatable,
  Snippet,
  Link
} from '@asl/components';

const formatters = {
  updatedAt: {
    format: date => format(date, dateFormat.medium)
  },
  licence: {
    format: licence => licence ? licence.toUpperCase() : null
  },
  type: {
    format: (type, model) => {
      const id = get(model, 'id');
      const licence = get(model, 'data.model');
      const subject = get(model, 'data.subject.name');

      return (
        <Fragment>
          <Link
            page="task.read"
            taskId={id}
            // adding optional snippet for backwards compatibility
            // as some task types wont have content defined.
            label={<Snippet optional>{`task.${licence}.${type}`}</Snippet>}
          />
          {
            subject && (
              <Fragment>
                <br />
                <span>{ subject }</span>
              </Fragment>
            )
          }
        </Fragment>
      );
    }
  }
};

export default () => <Datatable formatters={formatters} className="tasklist" />;
