import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { dateFormat } from '../../../../constants';
import { formatDate } from '../../../../lib/utils';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import schema from '../schema';
import {
  Link,
  Snippet,
  ModelSummary,
  Conditions,
  DownloadHeader
} from '@asl/components';
import LicenceStatusBanner from '../../../common/components/licence-status-banner';
import { Warning } from '@ukhomeoffice/react-components';

const PIL = ({
  pil,
  profile,
  canUpdate,
  allowedActions,
  openTask,
  correctEstablishment,
  currentPath
}) => {
  const canUpdateConditions = allowedActions.includes('pil.updateConditions') && pil.status === 'active';
  const backToProfile = <Link page="profile.read" label={<Snippet>action.backToProfile</Snippet>} />;

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
              <strong>{procedure}</strong>: <Snippet>{`procedureDefinitions.${procedure}`}</Snippet>
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
            canUpdate={canUpdateConditions && !openTask}
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

  return (
    <Fragment>
      <LicenceStatusBanner licence={pil} licenceType="pil" />

      <h3 className="licence-holder-name">{`${profile.firstName} ${profile.lastName}`}</h3>

      <DownloadHeader
        model={pil}
        licenceType="pil"
        isGranted={pil.status === 'active'}
        showWord={false}
        showPdf={true}
        basename={currentPath}
      />

      <ModelSummary model={pil} formatters={formatters} schema={schema} formatNullValue={true} />

      {
        canUpdate && (
          <Fragment>
            {
              correctEstablishment
                ? (
                  <p className="control-panel">
                    <Link
                      page="pil.update"
                      className="govuk-button"
                      label={<Snippet>{`action.${pil.status === 'active' ? 'amend' : 'reapply'}`}</Snippet>}
                    />
                    {
                      pil.status === 'active' && <Link page="pil.revoke" label={<Snippet>action.revoke</Snippet>} />
                    }
                    { backToProfile }
                  </p>
                )
                : (
                  <Fragment>
                    <p className="clear"><Snippet>cantUpdate</Snippet></p>
                    { backToProfile }
                  </Fragment>
                )
            }
          </Fragment>
        )
      }
    </Fragment>
  );
};

const mapStateToProps = ({
  static: {
    profile,
    canUpdate,
    pil,
    openTask,
    allowedActions,
    correctEstablishment,
    currentPath
  }
}) => ({
  pil,
  profile,
  canUpdate,
  allowedActions,
  openTask,
  correctEstablishment,
  currentPath
});

export default connect(mapStateToProps)(PIL);
