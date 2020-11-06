import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Header, Link, Snippet } from '@asl/components';
import { Button } from '@ukhomeoffice/react-components';
import { formatDate } from '../../../../lib/utils';
import { dateFormat } from '../../../../constants';
import formatters from '../../formatters';
import ProjectStatusBanner from '../../../project-version/components/project-status-banner';
import Section from './components/section';
import ManageAccess from './components/manage-access';
import RelatedTasks from '../../../task/list/views/related-tasks';

const getProjectDuration = model => formatters().duration.format(model.granted);

const getUngrantedVersion = model => {
  return ['draft', 'submitted'].includes(model.versions[0].status) ? model.versions[0] : null;
};

const confirmSubmission = message => e => {
  e.preventDefault();

  if (window.confirm(message)) {
    e.target.submit();
  }
};

function CurrentVersion({ model, additionalAvailabilityRemoved, additionalAvailability }) {
  if (model.status === 'transferred') {
    return null;
  }

  if (model.isLegacyStub) {
    return null;
  }

  const { openTask, editable, canUpdate, asruUser } = useSelector(state => state.static);
  const showEditLink = model.status === 'inactive' && model.draft && canUpdate && !asruUser;
  const page = showEditLink
    ? 'projectVersion.update'
    : 'projectVersion';

  let versionId = model.granted
    ? model.granted.id
    : model.versions[0].id;

  if (additionalAvailabilityRemoved) {
    versionId = additionalAvailability.versionId;
  }

  const status = model.versions[0].status;
  const returned = openTask && editable && canUpdate;

  let labelKey = model.granted
    ? `granted.${model.isLegacyStub ? 'stub' : model.status}`
    : `draft.${returned ? 'returned' : status}`;

  if (additionalAvailabilityRemoved) {
    labelKey = 'granted.additional-availability-removed';
  }

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
  const { openTask, editable, canUpdate, asruUser } = useSelector(state => state.static);

  if (!openTask || !openTask.data) {
    return null;
  }

  if (openTask.data.initiatedByAsru && !asruUser) {
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

  if (!canUpdate || openTask.data.initiatedByAsru !== asruUser) {
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
  const { confirmMessage, url, openTask, editable, asruUser, canTransfer } = useSelector(state => state.static);
  let startAmendmentDescriptionKey = 'start';

  if (!editable || model.status !== 'active') {
    return null;
  }

  const ungrantedVersion = getUngrantedVersion(model);

  if (ungrantedVersion && (ungrantedVersion.asruVersion !== asruUser)) {
    return null;
  }

  if (model.isLegacyStub) {
    return null;
  }

  // task is a pending revocation or licence holder change
  if (openTask && openTask.data.action !== 'grant') {
    return null;
  }

  const firstAmendment = model.versions[model.versions.findIndex(v => v.status === 'granted') - 1];
  const amendmentStartDate = firstAmendment && formatDate(firstAmendment.createdAt, dateFormat.short);

  if (model.draft) {
    startAmendmentDescriptionKey = 'continue';
  } else if (canTransfer) {
    startAmendmentDescriptionKey = 'transfer';
  }

  return (
    <Section
      title={<Snippet>{`start-amendment.title.${model.draft ? 'continue' : 'start'}`}</Snippet>}
      content={<Snippet amendmentStartDate={amendmentStartDate}>{`start-amendment.description.${startAmendmentDescriptionKey}`}</Snippet>}
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
  const { openTask, url, confirmMessage, asruUser } = useSelector(state => state.static);

  // draft project without open task can be discarded by establishment
  if (model.status !== 'inactive' || openTask || asruUser) {
    return null;
  }

  return (
    <Section
      title={<Snippet>discard.draft.title</Snippet>}
      content={<Snippet>discard.draft.description</Snippet>}
    >
      <form method="POST" action={`${url}/delete/draft`} onSubmit={confirmSubmission(confirmMessage)}>
        <Button className="button-warning">
          <Snippet>actions.discard.draft</Snippet>
        </Button>
      </form>
    </Section>
  );
}

function AmendStub({ model }) {
  const { asruLicensing } = useSelector(state => state.static);

  if (!model.isLegacyStub || !asruLicensing) {
    return null;
  }

  return (
    <Section
      title={<Snippet>amendStub.title</Snippet>}
      content={<Snippet>amendStub.description</Snippet>}
    >
      <form method="POST">
        <Button className="button-secondary">
          <Snippet>actions.amendStub</Snippet>
        </Button>
      </form>
    </Section>
  );
}

function DiscardStub({ model }) {
  const { url, confirmMessage, asruLicensing } = useSelector(state => state.static);

  // legacy stubs can be discarded at any point
  if (!model.isLegacyStub || !asruLicensing) {
    return null;
  }

  return (
    <Section
      title={<Snippet>discard.stub.title</Snippet>}
      content={<Snippet>discard.stub.description</Snippet>}
    >
      <form method="POST" action={`${url}/delete/stub`} onSubmit={confirmSubmission(confirmMessage)}>
        <Button className="button-warning">
          <Snippet>actions.discard.stub</Snippet>
        </Button>
      </form>
    </Section>
  );
}

function RevokeLicence({ model }) {
  const { openTask, canRevoke, asruUser } = useSelector(state => state.static);

  if (openTask || !canRevoke || model.status !== 'active') {
    return null;
  }

  if (model.isLegacyStub && !asruUser) {
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

function UserCannotEdit({ model }) {
  const { asruUser } = useSelector(state => state.static);

  if (model.status === 'inactive') {
    return null;
  }

  const ungrantedVersion = getUngrantedVersion(model);

  if (ungrantedVersion && (ungrantedVersion.asruVersion !== asruUser)) {
    return <Section
      title={<Snippet>{`start-amendment.title.continue`}</Snippet>}
      content={<Snippet>{`start-amendment.description.${asruUser ? 'asruCannotContinue' : 'establishmentCannotContinue'}`}</Snippet>}
    />;
  }

  return null;
}

function Actions({ model }) {
  const { canUpdate, canRevoke } = useSelector(state => state.static);

  // project can be edited if it is active or a draft.
  const isEditable = model.status === 'inactive' || model.status === 'active';

  if (!model.isLegacyStub) {
    if ((!canUpdate && !canRevoke) || !isEditable) {
      return null;
    }
  }

  return (
    <Fragment>
      <OpenTask model={model} />
      {
        canUpdate && (
          <Fragment>
            <UserCannotEdit model={model} />
            <StartAmendment model={model} />
            <AmendStub model={model} />
            <DiscardDraft model={model} />
            <DiscardStub model={model} />
          </Fragment>
        )
      }
    </Fragment>
  );
}

function PreviousVersions({ model }) {
  const versions = model.versions.filter(v => v.status === 'granted' && v.id !== model.granted.id && !v.isLegacyStub);

  if (model.status === 'transferred') {
    versions.unshift(model.granted);
  }

  if (!versions.length) {
    return null;
  }

  return (
    <Section
      title={<Snippet>previousVersions.title</Snippet>}
      content={<Snippet>previousVersions.description</Snippet>}
    >
      <ul>
        {
          versions.map((v, i) => {
            const isFirstVersion = i === versions.length - 1;
            const updatedAt = isFirstVersion
              ? model.issueDate
              : v.updatedAt;
            const type = isFirstVersion
              ? 'licence'
              : 'amendment';
            return (
              <li key={i}>
                <Link
                  page="projectVersion"
                  versionId={v.id}
                  label={<Snippet type={type} updatedAt={formatDate(updatedAt, dateFormat.long)}>previousVersions.version</Snippet>}
                />
              </li>
            );
          })
        }
      </ul>
    </Section>
  );
}

function RelatedContent({ project, version }) {
  return (
    <div className="related-content">
      <h3>Related content</h3>
      <ul>
        <li>
          <Link page="projectVersion.nts" projectId={project.id} versionId={version.id} label={<Snippet>related.nts</Snippet>} />
        </li>
      </ul>
    </div>
  );
}

export default function ProjectLandingPage() {
  const { canUpdate, openTask, allowedActions, asruLicensing, showRelatedTasks, additionalAvailability } = useSelector(state => state.static);
  const model = useSelector(state => state.model);
  const additionalAvailabilityRemoved = additionalAvailability && additionalAvailability.status === 'removed';

  const isRevoked = model.status === 'revoked';
  const isEditable = model.status === 'active' || model.status === 'inactive';
  const grantedVersion = model.versions.find(v => v.status === 'granted');

  const canManageAccess = model.status === 'inactive'
    ? (!additionalAvailability || additionalAvailability.status === 'draft')
    : (!additionalAvailability || additionalAvailability.status === 'active');

  const canChangeLicenceHolder = canUpdate && isEditable && (!model.isLegacyStub || (model.isLegacyStub && asruLicensing));

  return (
    <Fragment>
      <ProjectStatusBanner model={model} version={grantedVersion || model.versions[0]} />
      <Header
        subtitle={model.establishment.name}
        title={model.title || 'Untitled project'}
      />

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">

          <dl className="inline">
            <dt><Snippet>fields.licenceHolder.label</Snippet></dt>
            <dd>
              {`${model.licenceHolder.firstName} ${model.licenceHolder.lastName}`}<br />
              <Link page="profile.read" profileId={model.licenceHolder.id} label="View profile" />
              {
                canChangeLicenceHolder && (
                  <Fragment> | {
                    openTask
                      ? <Snippet>actions.cantChangeHolder</Snippet>
                      : <Link page="project.updateLicenceHolder" label="Change" />
                  }
                  </Fragment>
                )
              }
            </dd>

            <Fragment>
              <dt><Snippet>fields.licenceNumber.label</Snippet></dt>
              <dd>
                {model.licenceNumber ? model.licenceNumber : '-'}
                {
                  model.isLegacyStub && allowedActions.includes('project.updateLicenceNumber') &&
                  <Fragment>
                    <br />
                    <Link page="projectAsruActions.updateLicenceNumber" label="Change" />
                  </Fragment>
                }
              </dd>
            </Fragment>

            {
              model.granted && model.granted.duration && !isRevoked &&
              <Fragment>
                <dt><Snippet>fields.duration.label</Snippet></dt>
                <dd>{getProjectDuration(model)}</dd>
              </Fragment>
            }

            {
              model.issueDate &&
                <Fragment>
                  <dt><Snippet>fields.issueDate.label</Snippet></dt>
                  <dd>
                    {formatDate(model.issueDate, dateFormat.long)}
                    {
                      allowedActions.includes('project.updateIssueDate') &&
                        <Fragment>
                          <br />
                          <Link page="projectAsruActions.updateIssueDate" label="Change" />
                        </Fragment>
                    }
                  </dd>
                </Fragment>
            }

            {
              model.granted && (
                <Fragment>
                  {
                    model.amendedDate &&
                    <Fragment>
                      <dt><Snippet>fields.amendedDate.label</Snippet></dt>
                      <dd>{formatDate(model.amendedDate, dateFormat.long)}</dd>
                    </Fragment>
                  }
                  {
                    !isRevoked &&
                    <Fragment>
                      <dt><Snippet>fields.expiryDate.label</Snippet></dt>
                      <dd>{formatDate(model.expiryDate, dateFormat.long)}</dd>
                    </Fragment>
                  }
                  {
                    isRevoked &&
                    <Fragment>
                      <dt><Snippet>fields.revocationDate.label</Snippet></dt>
                      <dd>{formatDate(model.revocationDate, dateFormat.long)}</dd>
                    </Fragment>
                  }
                  {
                    model.raDate &&
                    <Fragment>
                      <dt><Snippet>fields.raDate.label</Snippet></dt>
                      <dd>{formatDate(model.raDate, dateFormat.long)}</dd>
                    </Fragment>
                  }
                  {
                    model.transferredInDate && (
                      <Fragment>
                        <dt><Snippet>fields.transferredInDate.label</Snippet></dt>
                        <dd>{formatDate(model.transferredInDate, dateFormat.long)}</dd>
                      </Fragment>
                    )
                  }
                  {
                    model.transferredOutDate && (
                      <Fragment>
                        <dt><Snippet>fields.transferredOutDate.label</Snippet></dt>
                        <dd>{formatDate(model.transferredOutDate, dateFormat.long)}</dd>
                      </Fragment>
                    )
                  }

                </Fragment>
              )
            }
          </dl>
        </div>

        <div className="govuk-grid-column-one-third">
          <RelatedContent project={model} version={grantedVersion || model.versions[0]} />
        </div>
      </div>
      <CurrentVersion model={model} additionalAvailabilityRemoved={additionalAvailabilityRemoved} additionalAvailability={additionalAvailability} />
      {
        !additionalAvailability && (
          <Fragment>
            <Actions model={model} />
            <PreviousVersions model={model} />
            <RevokeLicence model={model} />
          </Fragment>
        )
      }
      {
        canManageAccess && <ManageAccess model={model} />
      }
      { showRelatedTasks && !additionalAvailability && <RelatedTasks /> }
    </Fragment>
  );
}
