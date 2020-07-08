import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { dateFormat } from '../../../../constants';
import { formatDate, canUpdateModel } from '../../../../lib/utils';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import omit from 'lodash/omit';
import schema from '../schema';
import {
  Link,
  Snippet,
  ModelSummary,
  Conditions,
  DownloadHeader,
  LicenceStatusBanner
} from '@asl/components';
import { Warning } from '@ukhomeoffice/react-components';
import RelatedTasks from '../../../task/list/views/related-tasks';

const PIL = ({
  pil,
  profile,
  canUpdate,
  canReapply,
  allowedActions,
  canDownload,
  openTask,
  currentPath,
  isLicenceHolder,
  pilReviewRequired,
  reviewUrl,
  showRelatedTasks
}) => {
  const pilSchema = pil.status === 'revoked' ? omit(schema, 'reviewDate', 'updatedAt') : omit(schema, 'revocationDate');
  const canUpdateConditions = allowedActions.includes('pil.updateConditions') && pil.status === 'active';

  const formatters = {
    issueDate: {
      format: issueDate => formatDate(issueDate, dateFormat.long)
    },
    updatedAt: {
      format: (updatedAt, pil) => differenceInCalendarDays(updatedAt, pil.issueDate) > 0
        ? formatDate(updatedAt, dateFormat.long)
        : '-'
    },
    revocationDate: {
      format: revocationDate => formatDate(revocationDate, dateFormat.long)
    },
    reviewDate: {
      format: reviewDate => formatDate(reviewDate, dateFormat.long)
    },
    establishment: {
      format: e => e && e.name ? e.name : 'This licence is held at another establishment.'
    },
    species: {
      format: pilSpecies => {
        if (!pilSpecies) {
          return '-';
        }
        if (!Array.isArray(pilSpecies)) {
          return;
        }

        return (
          <ul className="species-list">
            { pilSpecies.map(species => <li key={species}>{species}</li>) }
          </ul>
        );
      }
    },
    procedures: {
      format: (procedures, pil) => {
        if (!procedures) {
          return '-';
        }
        return procedures.sort().map(procedure => {
          return (
            <p key={procedure}>
              <strong>{procedure}</strong>
              {': '}
              <Snippet>{`procedureDefinitions.${procedure}`}</Snippet>
              {
                procedure === 'F' && (
                  <em>: {pil.notesCatF}</em>
                )
              }
            </p>
          );
        });
      }
    },
    conditions: {
      format: conditions => {
        return (
          <Conditions
            conditions={conditions}
            canUpdate={canUpdateConditions && canUpdateModel(pil)}
            label={<Snippet>conditions.hasConditions</Snippet>}
            noConditionsLabel={<Snippet>conditions.noConditions</Snippet>}
          >
            {
              openTask && canUpdateConditions && (
                <Warning>
                  <Snippet>updateInProgress</Snippet>
                  <p><Link page="task.read" taskId={openTask.id} label={<Snippet>view-task</Snippet>} /></p>
                </Warning>
              )
            }
          </Conditions>
        );
      }
    }
  };

  let amendButtonSnippet = 'action.reapply.button';

  if (pil.status === 'active') {
    amendButtonSnippet = `action.amend.${isLicenceHolder ? 'licenceHolder' : 'other'}.button`;
  }

  return (
    <Fragment>
      <LicenceStatusBanner licence={pil} licenceType="pil" />
      {
        pilReviewRequired && (
          <Warning className="info pil-review">
            <Snippet
              reviewUrl={reviewUrl}
              openTask={openTask}
              overdue={pil.reviewOverdue}
            >
              warnings.pilReviewRequired
            </Snippet>
          </Warning>
        )
      }

      <DownloadHeader
        title={`${profile.firstName} ${profile.lastName}`}
        subtitle="Personal licence"
        licenceStatus={pil.status}
        showPdf={canDownload}
        basename={currentPath}
      />

      <ModelSummary model={pil} formatters={formatters} schema={pilSchema} formatNullValue={true} />

      {
        canUpdate && (
          <div className="licence-actions">
            <Fragment>
              {
                openTask &&
                  <section className="open-task">
                    <h2><Snippet>{`openTask.${openTask.type}.title`}</Snippet></h2>
                    <p><Snippet>{`openTask.${openTask.type}.description`}</Snippet></p>
                    <Link page="task.read" taskId={openTask.id} label={<Snippet>view-task</Snippet>} className="govuk-button button-secondary" />
                  </section>
              }

              {
                !openTask &&
                  <Fragment>
                    {
                      pil.status === 'active' &&
                      <Fragment>
                        <section className="amend-licence">
                          <Snippet>{`action.amend.${isLicenceHolder ? 'licenceHolder' : 'other'}.summary`}</Snippet>
                          <Link
                            page="pil.update"
                            className="govuk-button button-secondary"
                            establishmentId={pil.establishmentId}
                            label={<Snippet>{amendButtonSnippet}</Snippet>}
                          />
                        </section>
                        <section className="revoke-licence">
                          <Snippet>action.revoke.summary</Snippet>
                          <Link
                            page="pil.revoke"
                            className="govuk-button button-warning"
                            establishmentId={pil.establishmentId}
                            label={<Snippet>action.revoke.button</Snippet>}
                          />
                        </section>
                      </Fragment>
                    }
                    {
                      pil.status === 'revoked' && canReapply &&
                      <section className="amend-licence">
                        <Snippet>{`action.amend.${isLicenceHolder ? 'licenceHolder' : 'other'}.summary`}</Snippet>
                        <Link
                          page="pil.update"
                          className="govuk-button button-secondary"
                          establishmentId={pil.establishmentId}
                          label={<Snippet>action.reapply.button</Snippet>}
                        />
                      </section>
                    }
                    {
                      pil.status === 'revoked' && !canReapply && profile.over18 &&
                      <section className="apply-licence">
                        <Snippet>{`action.reapply.summary`}</Snippet>
                        <Link
                          page="pil.create"
                          className="govuk-button button-secondary"
                          label={<Snippet>action.reapply.button</Snippet>}
                        />
                      </section>
                    }
                  </Fragment>
              }
            </Fragment>
          </div>
        )
      }
      { showRelatedTasks && <RelatedTasks /> }
    </Fragment>
  );
};

const mapStateToProps = ({
  static: {
    profile,
    canUpdate,
    canReapply,
    canDownload,
    pil,
    openTask,
    allowedActions,
    currentPath,
    isLicenceHolder,
    pilReviewRequired,
    reviewUrl,
    showRelatedTasks
  }
}) => ({
  pil,
  profile,
  canUpdate,
  canReapply,
  canDownload,
  allowedActions,
  openTask,
  currentPath,
  isLicenceHolder,
  pilReviewRequired,
  reviewUrl,
  showRelatedTasks
});

export default connect(mapStateToProps)(PIL);
