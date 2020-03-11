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

const PIL = ({
  pil,
  profile,
  canUpdate,
  allowedActions,
  canDownload,
  openTask,
  currentPath,
  isLicenceHolder
}) => {
  const pilSchema = pil.status === 'revoked' ? omit(schema, 'reviewDate', 'updatedAt') : omit(schema, 'revocationDate');

  const canUpdateConditions = allowedActions.includes('pil.updateConditions') && pil.status === 'active';

  const formatters = {
    issueDate: {
      format: issueDate => formatDate(issueDate, dateFormat.medium)
    },
    updatedAt: {
      format: (updatedAt, pil) => differenceInCalendarDays(updatedAt, pil.issueDate) > 0
        ? formatDate(updatedAt, dateFormat.medium)
        : '-'
    },
    revocationDate: {
      format: revocationDate => formatDate(revocationDate, dateFormat.medium)
    },
    reviewDate: {
      format: reviewDate => formatDate(reviewDate, dateFormat.medium)
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
                    <section className="amend-licence">
                      <Snippet>{`action.amend.${isLicenceHolder ? 'licenceHolder' : 'other'}.summary`}</Snippet>
                      <Link
                        page="pil.update"
                        className="govuk-button button-secondary"
                        establishmentId={pil.establishmentId}
                        label={<Snippet>{amendButtonSnippet}</Snippet>}
                      />
                    </section>
                    {
                      pil.status === 'active' &&
                        <section className="revoke-licence">
                          <Snippet>action.revoke.summary</Snippet>
                          <Link
                            page="pil.revoke"
                            className="govuk-button button-warning"
                            establishmentId={pil.establishmentId}
                            label={<Snippet>action.revoke.button</Snippet>}
                          />
                        </section>
                    }
                  </Fragment>
              }
            </Fragment>
          </div>
        )
      }
    </Fragment>
  );
};

const mapStateToProps = ({
  static: {
    profile,
    canUpdate,
    canDownload,
    pil,
    openTask,
    allowedActions,
    currentPath,
    isLicenceHolder
  }
}) => ({
  pil,
  profile,
  canUpdate,
  canDownload,
  allowedActions,
  openTask,
  currentPath,
  isLicenceHolder
});

export default connect(mapStateToProps)(PIL);
