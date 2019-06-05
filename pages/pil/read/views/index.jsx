import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import dateFormatter from 'date-fns/format';
import { dateFormat } from '../../../../constants';
import schema from '../schema';
import {
  Link,
  Snippet,
  ModelSummary,
  Header,
  LicenceStatusBanner,
  Conditions
} from '@asl/components';
import { Warning } from '@ukhomeoffice/react-components';

const PIL = ({ pil, profile, canUpdate, allowedActions, openTask }) => {
  const canUpdateConditions = allowedActions.includes('pil.updateConditions');

  const formatters = {
    issueDate: {
      format: issueDate => dateFormatter(issueDate, dateFormat.medium)
    },
    revocationDate: {
      format: revocationDate => dateFormatter(revocationDate, dateFormat.medium)
    },
    species: {
      format: pilSpecies => {
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
        return procedures.map(procedure => {
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

  console.log(openTask);

  return (
    <Fragment>
      <LicenceStatusBanner licence={pil} licenceType="pil" />

      <Header
        title={<Snippet>title</Snippet>}
        subtitle={`${profile.firstName} ${profile.lastName}`}
      />

      <ModelSummary model={pil} formatters={formatters} schema={schema} />

      <p className="control-panel">
        {
          canUpdate && <Link page="pil.update" className="govuk-button" label="Amend licence"/>
        }
        <Link page="profile.view" label={<Snippet>action.backToProfile</Snippet>} />
      </p>
    </Fragment>
  );
};

const mapStateToProps = ({ static: { profile, canUpdate, pil, openTask, allowedActions } }) => ({ pil, profile, canUpdate, allowedActions, openTask });

export default connect(mapStateToProps)(PIL);
