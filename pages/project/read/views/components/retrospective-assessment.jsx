import React from 'react';
import { useSelector } from 'react-redux';
import format from 'date-fns/format';
import { dateFormat } from '../../../../../constants';
import { Snippet, Link } from '@ukhomeoffice/asl-components';
import { Button } from '@ukhomeoffice/react-components';
import Subsection from './subsection';

export default function RA() {
  const model = useSelector(state => state.model);
  const { url, openRaTask, canUpdateRa } = useSelector(state => state.static);

  if (!canUpdateRa) {
    return null;
  }

  if (!['expired', 'revoked'].includes(model.status)) {
    return null;
  }

  if (!model.raDate) {
    return null;
  }

  const hasRa = !!model.retrospectiveAssessments.length;

  return (
    <Subsection
      title={<Snippet>ra.title</Snippet>}
      content={
        model.raGrantedDate
          ? <Snippet date={format(model.raGrantedDate, dateFormat.long)}>ra.grantedDescription</Snippet>
          : <Snippet date={format(model.raDate, dateFormat.long)}>ra.description</Snippet>
      }
    >
      {
        model.grantedRa &&
          <Link
            page="retrospectiveAssessment"
            label={<Snippet>ra.granted</Snippet>}
            className="govuk-button button-secondary"
            raId={model.grantedRa.id}
          />
      }
      {
        // bugfix: handle potential submitted RA that has had the task discarded without deleting the RA
        !model.grantedRa && (!hasRa || (!openRaTask && !model.draftRa)) && (
          <form method="POST" action={`${url}/ra`}>
            <Button className="button-secondary">
              <Snippet>ra.create</Snippet>
            </Button>
          </form>
        )
      }
      {
        hasRa && openRaTask &&
          <Link
            page="task.read"
            label={<Snippet>ra.openTask</Snippet>}
            className="govuk-button button-secondary"
            taskId={openRaTask.id}
          />
      }
      {
        !openRaTask && model.draftRa &&
          <Link
            page="retrospectiveAssessment"
            label={<Snippet>ra.draft</Snippet>}
            className="govuk-button button-secondary"
            raId={model.draftRa.id}
          />
      }
    </Subsection>
  );
}
