import React, { Fragment } from 'react';
import StandardConditions from '../../../common/views/pdf/standard-conditions';
import ReactMarkdown from 'react-markdown';

const PIL = ({ pil, content }) => {
  const licenceHolder = pil.licenceHolder;

  const hasSpecies = pil.species && pil.species.length > 0;
  const hasProcedures = pil.procedures && pil.procedures.length > 0;
  const hasAdditionalConditions = pil.conditions && pil.conditions.length > 0;

  return (
    <Fragment>
      <div className="logo"></div>

      <h3 className="licence">PERSONAL LICENCE</h3>

      <h1 className="licence-holder">{`${licenceHolder.firstName} ${licenceHolder.lastName}`}</h1>

      <ReactMarkdown className="legal-preamble">{content.legalPreamble}</ReactMarkdown>

      {
        pil.showEstablishment ? (
          <section className="primary-establishment break">
            <h2>Primary establishment</h2>
            <p>{pil.establishment.name}</p>
            <ReactMarkdown>{pil.establishment.address}</ReactMarkdown>
          </section>
        ) : (
          <span className="break"></span>
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
            <p>None.</p>
          )
        }
      </section>

      <section className="procedures break">
        <h2>Procedures</h2>
        {
          hasProcedures ? (
            pil.procedures.map(procedureCode => (
              <Fragment key={procedureCode}>
                <h3 className="procedure-code">{procedureCode}</h3>
                <p>{content.procedureDefinitions[procedureCode]}</p>
                { procedureCode === 'F' &&
                  <Fragment>
                    <p><strong>Type of regulated procedure:</strong></p>
                    <p>{pil.notesCatF}</p>
                  </Fragment>
                }
              </Fragment>
            ))
          ) : (
            <p>None.</p>
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
                <ReactMarkdown>{pil.conditions}</ReactMarkdown>
              </div>
            </Fragment>
          ) : (
            <p>None.</p>
          )
        }
      </section>

      <StandardConditions conditions={content.standardConditions} className="break" />
    </Fragment>
  );
};

export default PIL;
