import React, { Fragment } from 'react';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { Header, Link, LicenceStatusBanner, Snippet, ControlBar } from '@asl/components';
import { Button } from '@ukhomeoffice/react-components';
import { formatDate } from '../../../../lib/utils';
import { dateFormat } from '../../../../constants';

const getProjectDuration = model => {
  if (!model.granted || isEmpty(model.granted.duration)) {
    return '-';
  }

  const { years, months } = model.granted.duration;

  return `${years} years ${months} months`;
};

const hasExpired = (model = {}) => model.expiryDate && model.expiryDate < new Date().toISOString();

const App = ({ model, establishment, url, content, openTask, canAmend, canDeleteDraft, canUpdateLicenceHolder }) => {
  let amendmentType = '';

  if (openTask) {
    amendmentType = model.granted ? 'submittedAmendment' : 'submittedDraft';
  } else {
    amendmentType = model.granted && model.draft ? 'continue' : 'create';
  }

  const { licenceHolder } = model;

  const discard = type => e => {
    e.preventDefault();

    const message = type === 'draft' ? content.discardDraft.confirm : content.amendment.discard.confirm;

    if (window.confirm(message)) {
      e.target.submit();
    }
  };

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
          <Fragment>
            {licenceHolder.firstName} {licenceHolder.lastName}<br />
            <Link page="profile.view" profileId={licenceHolder.id} label="View profile" />
            { canUpdateLicenceHolder && (
              <Fragment> | <Link page="project.updateLicenceHolder.update" label="Change" /></Fragment>
            )}
          </Fragment>
        </dd>

        <Fragment>
          <dt><Snippet>fields.licenceNumber.label</Snippet></dt>
          <dd>{model.licenceNumber ? model.licenceNumber : '-'}</dd>
        </Fragment>

        {
          model.granted &&
            <Fragment>
              <dt><Snippet>fields.duration.label</Snippet></dt>
              <dd>{getProjectDuration(model)}</dd>

              <dt><Snippet>fields.issueDate.label</Snippet></dt>
              <dd>{formatDate(model.issueDate, dateFormat.medium)}</dd>

              <dt><Snippet>fields.expiryDate.label</Snippet></dt>
              <dd>{formatDate(model.expiryDate, dateFormat.medium)}</dd>
            </Fragment>
        }
      </dl>

      <ControlBar>
        {
          !model.granted && model.draft &&
            <Link
              page="project.version.update"
              versionId={model.draft.id}
              className="govuk-button"
              label={<Snippet>fields.draft.view</Snippet>}
            />
        }

        {
          !model.granted && model.withdrawn &&
            <form method="POST">
              <button className="govuk-button">
                <span><Snippet>fields.draft.view</Snippet></span>
              </button>
            </form>
        }

        {
          model.granted &&
            <Link
              page="project.version.read"
              versionId={model.granted.id}
              className="govuk-button"
              label={<Snippet>{`fields.granted.${hasExpired(model) ? 'expired' : 'view'}`}</Snippet>}
            />
        }
      </ControlBar>

      {
        canAmend &&
          <Fragment>
            <hr />
            <h2><Snippet>{`amendment.${amendmentType}.title`}</Snippet></h2>
            <p>
              <Snippet amendmentStartDate={model.draft && formatDate(model.draft.createdAt, dateFormat.short)}>
                {`amendment.${amendmentType}.description`}
              </Snippet>
            </p>
            <Fragment>
              <form method="POST">
                <Button className="button-secondary">
                  <Snippet>{`amendment.${amendmentType}.action`}</Snippet>
                </Button>
              </form>

              {
                amendmentType === 'continue' &&
                  <form method="POST" action={`${url}/delete/amendment`} onSubmit={discard('amendment')}>
                    <button className="link">
                      <span><Snippet>amendment.discard.action</Snippet></span>
                    </button>
                  </form>
              }
            </Fragment>
          </Fragment>
      }

      {
        openTask &&
          <Fragment>
            <hr />
            <h2><Snippet>{`amendment.${amendmentType}.title`}</Snippet></h2>
            <p>
              <Snippet amendmentStartDate={model.draft && formatDate(model.draft.createdAt, dateFormat.short)}>
                {`amendment.${amendmentType}.description`}
              </Snippet>
            </p>
            <Link
              page="task.read"
              taskId={openTask.id}
              className="govuk-button button-secondary"
              label={<Snippet>{`amendment.${amendmentType}.action`}</Snippet>}
            />
          </Fragment>
      }

      {
        canDeleteDraft &&
          <Fragment>
            <hr />
            <h2><Snippet>discardDraft.title</Snippet></h2>
            <p><Snippet>discardDraft.description</Snippet></p>
            <form method="POST" action={`${url}/delete/draft`} onSubmit={discard('draft')}>
              <Button className="button-warning">
                <Snippet>discardDraft.action</Snippet>
              </Button>
            </form>
          </Fragment>
      }

      {
        model.status === 'active' &&
          <Fragment>
            <hr />
            <p><Link page="project.version.pdf" versionId={model.status === 'active' ? model.granted.id : model.draft.id} className="govuk-button button-secondary" label="Export licence as PDF" /></p>
          </Fragment>
      }
    </Fragment>
  );
};

const mapStateToProps = ({
  model,
  static: {
    establishment,
    url,
    content,
    openTask,
    editPerms: { canAmend, canDeleteDraft, canUpdateLicenceHolder }
  }
}) => ({
  model,
  establishment,
  url,
  content,
  openTask,
  canAmend,
  canDeleteDraft,
  canUpdateLicenceHolder
});

export default connect(mapStateToProps)(App);
