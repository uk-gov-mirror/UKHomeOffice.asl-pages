import React, { Fragment } from 'react';
import StandardConditions from '../../../common/views/pdf/standard-conditions';
import ProceduresDiff from '../../procedures/views/diff';
import { Markdown } from '@ukhomeoffice/asl-components';

const PIL = ({ pil, content }) => {
  const licenceHolder = pil.licenceHolder;

  const hasSpecies = pil.species && pil.species.length > 0;
  const hasProcedures = pil.procedures && pil.procedures.length > 0;
  const hasAdditionalConditions = !!pil.conditions;

  return (
    <Fragment>
      <div className="logo"></div>

      <h3 className="licence">PERSONAL LICENCE</h3>

      <h1 className="licence-holder">{`${licenceHolder.firstName} ${licenceHolder.lastName}`}</h1>

      <Markdown className="legal-preamble">{content.legalPreamble}</Markdown>

      {
        !pil.multipleEstablishments && (
          <section className="primary-establishment break">
            <h2>Primary establishment</h2>
            {
              pil.establishment &&
                <Fragment>
                  <p>{pil.establishment.name}</p>
                  <Markdown>{pil.establishment.address}</Markdown>
                </Fragment>
            }
            {
              // pil.establishment is not hydrated when user is not at the holding establishment
              !pil.establishment && (
                <p>This licence is held at another establishment.</p>
              )
            }
          </section>
        )
      }

      <section className="animal-types">
        <h2>Animal types</h2>
        {
          hasSpecies ? (
            <ul>
              {
                pil.species.map((species, index) => <li key={index}>{species}</li>)
              }
            </ul>
          ) : (
            <p>None</p>
          )
        }
      </section>

      <section className="procedures">
        <h2>Procedures</h2>
        {
          hasProcedures ? (
            <ProceduresDiff after={pil.procedures} afterPil={pil} />
          ) : (
            <p>None</p>
          )
        }
      </section>

      <section className="additional-conditions break">
        <h2>Additional conditions</h2>
        {
          hasAdditionalConditions ? (
            <Fragment>
              <p>In addition to the standard conditions:</p>
              <div className="purple-inset">
                <Markdown>{pil.conditions}</Markdown>
              </div>
            </Fragment>
          ) : (
            <p>None</p>
          )
        }
      </section>

      <StandardConditions conditions={content.standardConditions} className="break" />
    </Fragment>
  );
};

export default PIL;
