import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Header, Link, Snippet } from '@asl/components';
import { Button } from '@ukhomeoffice/react-components';
import LicenceStatusBanner from '../../../common/components/licence-status-banner';
import { formatDate } from '../../../../lib/utils';
import { dateFormat } from '../../../../constants';
import formatters from '../../formatters';

const getProjectDuration = model => formatters.duration.format(model.granted);

const confirmSubmission = message => e => {
  e.preventDefault();

  if (window.confirm(message)) {
    e.target.submit();
  }
};

function Section({
  title,
  content,
  children
}) {
  return (
    <Fragment>
      <hr />
      <h2>{ title }</h2>
      <p>{ content }</p>
      { children }
    </Fragment>
  );
}

function CurrentVersion({ model }) {
  const { openTask, editable, canUpdate } = useSelector(state => state.static);
  const showEditLink = model.status === 'inactive' && model.draft && canUpdate;
  const page = showEditLink
    ? 'projectVersion.update'
    : 'projectVersion';

  const versionId = model.granted
    ? model.granted.id
    : model.versions[0].id;

  const status = model.versions[0].status;
  const returned = openTask && editable && canUpdate;

  const labelKey = model.granted
    ? `granted.${model.status}`
    : `draft.${returned ? 'returned' : status}`;

  return (
    <Link
      page={page}
      versionId={versionId}
      className="govuk-button"
      label={<Snippet>{`actions.view.${labelKey}`}</Snippet>}
    />
  );
}

function OpenTask({ model }) {
  const { openTask, editable, canUpdate } = useSelector(state => state.static);

  if (!openTask) {
    return null;
  }

  if (editable && openTask.data.action === 'grant' && model.status !== 'inactive') {
    return null;
  }

  let type = model.status === 'inactive' ? 'application' : 'amendment';

  if (openTask.data.action === 'revoke') {
    type = 'revocation';
  }

  const status = type;

  if (openTask.data.action === 'update') {
    type = 'update-licence-holder';
  }

  if (model.status === 'inactive' && editable) {
    type = 'returned-draft';
  }

  if (!canUpdate) {
    type = 'cannot-update';
  }

  return (
    <Section
      title={<Snippet status={`${status.charAt(0).toUpperCase()}${status.substring(1)}`}>{`openTask.${type}.title`}</Snippet>}
      content={<Snippet status={status}>{`openTask.${type}.description`}</Snippet>}
    >
      <Link
        page="task.read"
        taskId={openTask.id}
        className="govuk-button button-secondary"
        label={<Snippet>actions.viewTask</Snippet>}
      />
    </Section>
  );
}

function StartAmendment({ model }) {
  const { confirmMessage, url, openTask, editable } = useSelector(state => state.static);

  if (!editable || model.status !== 'active') {
    return null;
  }

  // task is a pending revocation or licence holder change
  if (openTask && openTask.data.action !== 'grant') {
    return null;
  }

  const firstAmendment = model.versions[model.versions.findIndex(v => v.status === 'granted') - 1];
  const amendmentStartDate = firstAmendment && formatDate(firstAmendment.createdAt, dateFormat.short);

  return (
    <Section
      title={<Snippet>{`start-amendment.title.${model.draft ? 'continue' : 'start'}`}</Snippet>}
      content={<Snippet amendmentStartDate={amendmentStartDate}>{`start-amendment.description.${model.draft ? 'continue' : 'start'}`}</Snippet>}
    >
      <form method="POST">
        <Button className="button-secondary">
          <Snippet>{`actions.${model.draft ? 'continue' : 'amend'}`}</Snippet>
        </Button>
      </form>
      {
        model.draft && (
          <Fragment>
            {
              openTask
                ? (
                  <Link
                    page="task.read"
                    taskId={openTask.id}
                    label={<Snippet>actions.discardTask</Snippet>}
                  />
                )
                : (
                  <form method="POST" action={`${url}/delete/amendment`} onSubmit={confirmSubmission(confirmMessage)}>
                    <button className="link">
                      <span><Snippet>actions.discard.amendment</Snippet></span>
                    </button>
                  </form>
                )
            }
          </Fragment>
        )
      }
    </Section>
  );
}

function DiscardDraft({ model }) {
  const { openTask, url, confirmMessage } = useSelector(state => state.static);

  // draft project without open task can be discarded
  if (model.status !== 'inactive' || openTask) {
    return null;
  }

  return (
    <Section
      title={<Snippet>discardDraft.title</Snippet>}
      content={<Snippet>discardDraft.description</Snippet>}
    >
      <form method="POST" action={`${url}/delete/draft`} onSubmit={confirmSubmission(confirmMessage)}>
        <Button className="button-warning">
          <Snippet>actions.discard.application</Snippet>
        </Button>
      </form>
    </Section>
  );
}

function RevokeLicence({ model }) {
  const { openTask, canRevoke } = useSelector(state => state.static);

  if (openTask || !canRevoke || model.status !== 'active') {
    return null;
  }

  return (
    <Section
      title={<Snippet>revoke.title</Snippet>}
      content={<Snippet>revoke.description</Snippet>}
    >
      <Link
        page="project.revoke"
        className="govuk-button button-warning"
        label={<Snippet>actions.revoke</Snippet>}
      />
    </Section>
  );
}

function Actions({ model }) {
  const { canUpdate, canRevoke } = useSelector(state => state.static);

  // project can be edited if it is active or a draft.
  const isEditable = model.status === 'inactive' || model.status === 'active';

  if ((!canUpdate && !canRevoke) || !isEditable) {
    return null;
  }

  return (
    <Fragment>
      <OpenTask model={model} />
      {
        canUpdate && (
          <Fragment>
            <StartAmendment model={model} />
            <DiscardDraft model={model} />
          </Fragment>
        )
      }
    </Fragment>
  );
}

export default function ProjectLandingPage() {
  const { establishment, canUpdate, openTask, allowedActions } = useSelector(state => state.static);
  const model = useSelector(state => state.model);

  const isEditable = model.status === 'active' || model.status === 'inactive';

  return (
    <Fragment>
      <LicenceStatusBanner licence={model} licenceType="ppl" />

      <Header
        subtitle={establishment.name}
        title={model.title || 'Untitled project'}
      />

      <dl className="inline">

        <dt><Snippet>fields.licenceHolder.label</Snippet></dt>
        <dd>
          {model.licenceHolder.firstName} {model.licenceHolder.lastName}<br />
          <Link page="profile.read" profileId={model.licenceHolder.id} label="View profile" />
          {
            canUpdate && !openTask && isEditable && (
              <Fragment> | <Link page="project.updateLicenceHolder" label="Change" /></Fragment>
            )
          }
        </dd>

        <Fragment>
          <dt><Snippet>fields.licenceNumber.label</Snippet></dt>
          <dd>{model.licenceNumber ? model.licenceNumber : '-'}</dd>
        </Fragment>

        {
          model.granted && (
            <Fragment>
              <dt><Snippet>fields.duration.label</Snippet></dt>
              <dd>{getProjectDuration(model)}</dd>

              <dt><Snippet>fields.issueDate.label</Snippet></dt>
              <dd>
                {formatDate(model.issueDate, dateFormat.medium)}
                {
                  allowedActions.includes('project.updateIssueDate') &&
                    <Fragment>
                      <br />
                      <Link page="projectAsruActions.updateIssueDate" label="Change" />
                    </Fragment>
                }
              </dd>

              {
                model.amendedDate &&
                <Fragment>
                  <dt><Snippet>fields.amendedDate.label</Snippet></dt>
                  <dd>{formatDate(model.amendedDate, dateFormat.medium)}</dd>
                </Fragment>
              }

              <dt><Snippet>fields.expiryDate.label</Snippet></dt>
              <dd>{formatDate(model.expiryDate, dateFormat.medium)}</dd>
            </Fragment>
          )
        }
      </dl>
      <CurrentVersion model={model} />
      <Actions model={model} />
      <RevokeLicence model={model} />
    </Fragment>
  );
}
