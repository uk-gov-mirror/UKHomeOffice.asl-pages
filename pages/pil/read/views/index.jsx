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
  LicenceStatusBanner
} from '@asl/components';

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
    format: (procedures, pil) => (procedures || []).map(procedure => {
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
    })
  }
};

const PIL = ({ model, profile, canUpdate }) => {
  return (
    <Fragment>
      <LicenceStatusBanner licence={model} licenceType="pil" />

      <Header
        title={<Snippet>title</Snippet>}
        subtitle={`${profile.firstName} ${profile.lastName}`}
      />

      <ModelSummary model={model} formatters={formatters} schema={schema} />

      <p className="control-panel">
        {
          canUpdate && <Link page="pil.update" className="govuk-button" label="Amend licence"/>
        }
        <Link page="profile.view" label={<Snippet>action.backToProfile</Snippet>} />
      </p>
    </Fragment>
  );
};

const mapStateToProps = ({ model, static: { profile, canUpdate } }) => ({ model, profile, canUpdate });

export default connect(mapStateToProps)(PIL);
