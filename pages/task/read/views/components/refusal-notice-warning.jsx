import React from 'react';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import { format as formatDate } from 'date-fns';
import { dateFormat } from '../../../../../constants';
import { Warning } from '@ukhomeoffice/react-components';
import { Snippet } from '@ukhomeoffice/asl-components';

export default function RefusalNoticeWarning({ task }) {
  const { isAsru } = useSelector(state => state.static);
  const intentionToRefuse = get(task, 'data.intentionToRefuse');
  const today = formatDate(new Date(), 'YYYY-MM-DD');

  if (task.status === 'refused' || !intentionToRefuse || !intentionToRefuse.deadline) {
    return null;
  }

  if (intentionToRefuse.deadline < today) {
    return (
      <Warning>
        <Snippet>{`status.intention-to-refuse.warning.${isAsru ? 'passedAsru' : 'passed'}`}</Snippet>
      </Warning>
    );
  }

  const respondBy = formatDate(intentionToRefuse.deadline, dateFormat.long);

  return (
    <Warning>
      <Snippet respondBy={respondBy}>{`status.intention-to-refuse.warning.${isAsru ? 'futureAsru' : 'future'}`}</Snippet>
    </Warning>
  );
}
