import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Snippet, Link } from '@ukhomeoffice/asl-components';
import Subsection from './subsection';
import formatters from '../../../../task/list/formatters';
import { formatDate } from '../../../../../lib/utils';
import { dateFormat } from '../../../../../constants';

const format = (type, value, task) => {
  return formatters[type].format(value, task);
};

export default function CurrentActivity() {
  const project = useSelector(state => state.model);
  const { additionalAvailability, workflowConnectionError, showRelatedTasks, asruUser } = useSelector(state => state.static);

  if (additionalAvailability || !showRelatedTasks) {
    return null;
  }

  if (project.status === 'inactive' && project.openTasks.length === 0) {
    return null;
  }

  const unsubmittedDraft = project.draft;
  const draftStartDate = unsubmittedDraft && formatDate(unsubmittedDraft.createdAt, dateFormat.short);
  let unsubmittedDraftSnippet = 'continue';

  if (unsubmittedDraft && unsubmittedDraft.asruVersion !== asruUser) {
    unsubmittedDraftSnippet = asruUser ? 'asruCannotContinue' : 'establishmentCannotContinue';
  }

  return (
    <Subsection title="Current activity" className="current-activity">
      {
        workflowConnectionError &&
          <p><em>There was a problem fetching open tasks.</em></p>
      }

      {
        unsubmittedDraft &&
          <Fragment>
            <h3><Snippet>currentActivity.amendmentStarted.title</Snippet></h3>
            <p><Snippet amendmentStartDate={draftStartDate}>{`start-amendment.description.${unsubmittedDraftSnippet}`}</Snippet></p>
            {
              unsubmittedDraftSnippet === 'continue' &&
                <Link
                  page="projectVersion.update"
                  versionId={unsubmittedDraft.id}
                  label={<Snippet>actions.continue</Snippet>}
                  className="govuk-button button-secondary"
                />
            }
          </Fragment>
      }

      {
        !workflowConnectionError && project.openTasks.length === 0 && !unsubmittedDraft &&
          <p><em><Snippet>currentActivity.nothingInProgress</Snippet></em></p>
      }

      {
        !workflowConnectionError && project.openTasks.length > 0 &&
          <table className="govuk-table govuk-react-datatable tasklist">
            <thead>
              <tr>
                <th>Last changed</th>
                <th>Establishment</th>
                <th>Type</th>
                <th>Status</th>
                {
                  asruUser &&
                    <Fragment>
                      <th>Deadline</th>
                      <th>Assigned to</th>
                    </Fragment>
                }
              </tr>
            </thead>
            <tbody>
              {
                project.openTasks.map(task => (
                  <tr key={task.id}>
                    <td>{format('updatedAt', task.updatedAt, task)}</td>
                    <td>{format('establishment', task.data.establishment.name, task)}</td>
                    <td>{format('type', task.data.action, task)}</td>
                    <td>{format('status', task.status, task)}</td>
                    {
                      asruUser &&
                        <Fragment>
                          <td>{format('activeDeadline', task.activeDeadline, task)}</td>
                          <td>{format('assignedTo', task.assignedTo, task)}</td>
                        </Fragment>
                    }
                  </tr>
                ))
              }
            </tbody>
          </table>
      }
    </Subsection>
  );
}
