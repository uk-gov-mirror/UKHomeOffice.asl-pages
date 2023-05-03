import React from 'react';
import omit from 'lodash/omit';
import {
  Snippet,
  StickyNavAnchor,
  Diff
} from '@ukhomeoffice/asl-components';
import userSchema from '../../../../user/update/schema';
import { dateFormat } from '../../../../../constants';
import { formatDate } from '../../../../../lib/utils';

const formatters = {
  dob: {
    format: date => formatDate(date, dateFormat.short)
  }
};

export default function Profile({ task, values, schema }) {
  const isComplete = !task.isOpen;
  return (
    <StickyNavAnchor id="changes">
      <h2><Snippet>sticky-nav.changes</Snippet></h2>
      <Diff
        before={values}
        after={task.data.data}
        schema={omit(userSchema, 'comments')}
        formatters={formatters}
        currentLabel={isComplete && <Snippet>diff.previous</Snippet>}
        proposedLabel={isComplete && <Snippet>diff.changed-to</Snippet>}
      />
    </StickyNavAnchor>
  );
}
