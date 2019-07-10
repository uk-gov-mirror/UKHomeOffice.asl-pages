import React, { Fragment } from 'react';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { Header, Link, LicenceStatusBanner, Snippet, ControlBar } from '@asl/components';
import { Button } from '@ukhomeoffice/react-components';
import format from 'date-fns/format';
import { dateFormat } from '../../../../constants';

const getProjectDuration = model => {
  if (!model.granted || isEmpty(model.granted.duration)) {
    return '-';
  }

  const { years, months } = model.granted.duration;

  return `${years} years ${months} months`;
};

const hasExpired = (model = {}) => model.expiryDate && model.expiryDate < new Date().toISOString();

const App = ({ model, establishment, canUpdate, url, content }) => {
  const openTask = model.openTasks.find(task => task.status !== 'returned-to-applicant');
  const canAmend = canUpdate && model.status === 'active' && !openTask;

  const amendmentType = openTask
    ? 'submitted'
    : model.granted && model.draft ? 'continue' : 'create';

  const canUpdateLicenceHolder = canUpdate &&
    ((model.granted && !model.draft) || !model.granted) &&
    !model.submitted &&
    !openTask;

  const {
    licenceHolder
  } = model;

  const discard = type => e => {
    e.preventDefault();

    const message = type === 'draft' ? content.discardDraft.confirm : content.amendment.discard.confirm;

    if (window.confirm(message)) {
      e.target.closest('form').submit();
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
              <dd>{format(model.issueDate, dateFormat.medium)}</dd>

              <dt><Snippet>fields.expiryDate.label</Snippet></dt>
              <dd>{format(model.expiryDate, dateFormat.medium)}</dd>
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
        (canAmend || openTask) &&
          <Fragment>
            <hr />
            <h2><Snippet>{`amendment.${amendmentType}.title`}</Snippet></h2>
            <p>
              <Snippet amendmentStartDate={model.draft && format(model.draft.createdAt, dateFormat.short)}>
                {`amendment.${amendmentType}.description`}
              </Snippet>
            </p>
            {
              openTask ? (
                <Link
                  page="task.read"
                  taskId={openTask.id}
                  className="govuk-button button-secondary"
                  label={<Snippet>{`amendment.${amendmentType}.action`}</Snippet>}
                />
              ) : (
                <Fragment>
                  <form method="POST">
                    <Button className="button-secondary">
                      <Snippet>{`amendment.${amendmentType}.action`}</Snippet>
                    </Button>
                  </form>

                  {
                    amendmentType === 'continue' &&
                      <form method="POST" action={`${url}/delete/amendment`}>
                        <a href="#" onClick={discard(<Snippet>amendment.discard.confirm</Snippet>)}>
                          <Snippet>amendment.discard.action</Snippet>
                        </a>
                      </form>
                  }
                </Fragment>
              )
            }
          </Fragment>
      }

      {
        !model.granted && model.draft && !openTask &&
          <Fragment>
            <hr />
            <h2><Snippet>discardDraft.title</Snippet></h2>
            <p><Snippet>discardDraft.description</Snippet></p>
            <form method="POST" action={`${url}/delete/draft`}>
              <Button className="button-warning" onClick={discard(<Snippet>discardDraft.confirm</Snippet>)}>
                <Snippet>discardDraft.action</Snippet>
              </Button>
            </form>
          </Fragment>
      }

      {
        model.status === 'active' &&
          <Fragment>
            <hr />
            <p><Link page="project.version.pdf" versionId={model.status === 'active' ? model.granted.id : model.draft.id} className="govuk-button button-secondary" label="Export Licence as PDF" /></p>
          </Fragment>
      }
    </Fragment>
  );
};

const mapStateToProps = ({ model, static: { establishment, canUpdate, url, content } }) => ({ model, establishment, canUpdate, url, content });

export default connect(mapStateToProps)(App);
