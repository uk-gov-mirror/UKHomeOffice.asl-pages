import React, { Fragment } from 'react';
import StandardConditions from '../../../common/views/pdf/standard-conditions';
import ReactMarkdown from 'react-markdown';

const PIL = ({ pil, content }) => {
  const licenceHolder = pil.licenceHolder;
  const establishment = pil.establishment;

  const hasSpecies = pil.species && pil.species.length > 0;
  const hasProcedures = pil.procedures && pil.procedures.length > 0;
  const hasAdditionalConditions = pil.conditions && pil.conditions.length > 0;

  return (
    <Fragment>
      <div className="logo"></div>

      <h3 className="licence">PERSONAL LICENCE</h3>

      <h1 className="licence-holder">{`${licenceHolder.firstName} ${licenceHolder.lastName}`}</h1>

      {/* <ReactMarkdown>{content.legalPreamble}</ReactMarkdown> */}

      <p>
        A personal licence on its own does not authorise you to perform regulated procedures on protected animals. You
        apply regulated procedures of the category or categories specified below to animals of the species or groups
        specified below at places specified in authorised project licences subject to the restrictions and provisions
        contained in the Act and the conditions and restrictions below.
      </p>
      <p>
        You are required to keep a record of all regulated procedures that you have carried out, and to make this
        record available to the Home Office upon request. If you cease to work at the establishment given as the primary
        availability on your licence, or it ceases to be the place where you wish your licence to be primarily
        available, you must notify the Home Office.
      </p>
      <p>
        This licence shall be in force until it is revoked by the Home Office and shall be subject to periodic review.
      </p>

      <section className="primary-establishment break">
        <h2>Primary establishment</h2>
        <p>{establishment.address}</p>
      </section>

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
                { procedureCode === 'D' &&
                  <Fragment>
                    <p><strong>Evidence of competency:</strong></p>
                    <p>{pil.notesCatD}</p>
                  </Fragment>
                }
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
              <ol>
                {
                  pil.conditions.map((condition, index) => (
                    <li key={index}>
                      <div className="purple-inset">
                        <ReactMarkdown>{condition}</ReactMarkdown>
                      </div>
                    </li>
                  ))
                }
              </ol>
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
