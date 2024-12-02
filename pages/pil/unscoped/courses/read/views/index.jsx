import React, { Fragment } from 'react';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import { Snippet, Header, ModelSummary, Link, ApplyChanges, Datatable } from '@ukhomeoffice/asl-components';
import { getUrl } from '@ukhomeoffice/asl-components/src/link';
import { Warning } from '@ukhomeoffice/react-components';
import schema from '../schema';
import formatters from '../../formatters';
import taskFormatters from '../../../../../task/list/formatters';

const bad = ['expired', 'transferred', 'revoked'];
const good = ['active'];

const tableFormatters = {
  profile: {
    format: (val, task) => `${get(task, 'data.modelData.profile.firstName')} ${get(task, 'data.modelData.profile.lastName')}`
  },
  details: {
    format: (val, task) => {
      if (task.status !== 'resolved') {
        return <Link page="task.read" taskId={task.id} label="View task" />;
      }
      if (task.modelStatus === 'active') {
        return <Link
          page="pil.read"
          profileId={task.data.modelData.profile.id}
          label="View licence"
        />;
      }
      return '-';
    }
  },
  status: {
    format: (status, task) => {
      const visibleTaskStatuses = [
        'discarded-by-applicant',
        'rejected'
      ];
      if (task.modelStatus === 'inactive' || visibleTaskStatuses.includes(status)) {
        return taskFormatters.status.format(status, task);
      }
      const className = classnames({ badge: true, complete: good.includes(task.modelStatus), rejected: bad.includes(task.modelStatus) });
      return <span className={ className }>{task.modelStatus.toUpperCase()}</span>;
    }
  },
  actions: {
    format: (val, task) => {
      if (task.status === 'resolved' && task.modelStatus === 'active') {
        return task.openRevocation
          ? <em>Revocation pending</em>
          : <Link
            page="pils.courses.participants.revoke"
            trainingPilId={task.data.id}
            label="Revoke"
          />;
      }
      return '-';
    }
  }
};

// This check can be removed once all training courses have coursePurpose set
const checkCoursePurposeBeforeApplyForLicence = (model, canUpdate, noOfParticipants) => {
  if (!canUpdate) { return null; }

  if (!model.coursePurpose) {
    if (noOfParticipants > 0) {
      return (
        <>
          <Warning>
            <Snippet>coursePurposeRequiredWarningForExistingParticipants</Snippet>
          </Warning>
        </>
      );
    }

    if (noOfParticipants === 0) {
      return (
        <>
          <Warning><Snippet>coursePurposeRequiredWarning</Snippet></Warning>
          <Link page="pils.courses.update" className="govuk-button button-secondary" label={<Snippet>buttons.edit</Snippet>} />
        </>
      );
    }
  }

  return <Link page="pils.courses.participants.add" className="govuk-button button-secondary" label={<Snippet>buttons.apply</Snippet>} />;
};

export default function Page() {
  const model = useSelector(state => state.model);
  const noOfParticipants = useSelector(state => state.datatable.data.rows.length);
  const allowedActions = useSelector(state => state.static.allowedActions);
  const deletePath = getUrl({ page: 'pils.courses.delete' });

  const canUpdate = allowedActions.includes('trainingCourse.update');

  function confirmRemove(e) {
    if (window.confirm(`Are you sure you want to delete this training course?`)) {
      return true;
    }
    e.preventDefault();
  }

  return (
    <Fragment>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <Header
            title={<Snippet>title</Snippet>}
          />
          <ModelSummary schema={schema} formatters={formatters} />
          {
            model.trainingPils.length === 0 && canUpdate && (
              <Fragment>
                <Warning><Snippet>warning</Snippet></Warning>
                <p className="control-panel">
                  <Link page="pils.courses.update" label={<Snippet>buttons.edit</Snippet>} />
                  <ApplyChanges
                    type="form"
                    action={deletePath}
                    method="POST"
                  >
                    <button className="link" onClick={confirmRemove}><Snippet>buttons.delete</Snippet></button>
                  </ApplyChanges>
                </p>
              </Fragment>
            )
          }
        </div>
      </div>
      <hr />
      <h3><Snippet>participants.title</Snippet></h3>
      <p><Snippet>participants.subtitle</Snippet></p>
      {checkCoursePurposeBeforeApplyForLicence(model, canUpdate, noOfParticipants)}
      <Datatable formatters={tableFormatters} />
    </Fragment>
  );
}
