import React, { Fragment } from 'react';
import ReactMarkdown from 'react-markdown';
import map from 'lodash/map';
import StandardConditions from '../../../common/views/pdf/standard-conditions';

const getName = person => `${person.firstName} ${person.lastName}`;

const triggerContinued = () => {
  let first = true;

  return () => {
    if (first) {
      first = false;
      return '';
    }
    return ' (continued)';
  };
};

const Establishment = ({ establishment, content }) => {
  const licenceHolders = establishment.namedPeople.pelh;
  const hasAdditionalConditions = !!establishment.conditions;
  const hasApprovedAreas = !!establishment.places;
  const hasAuthorisations = establishment.authorisations && establishment.authorisations.length > 0;
  const killing = establishment.authorisations.filter(({ type }) => type === 'killing');
  const rehomes = establishment.authorisations.filter(({ type }) => type === 'rehomes');

  const continued = triggerContinued();

  return (
    <Fragment>
      <div className="logo"></div>

      <h3 className="licence">ESTABLISHMENT LICENCE</h3>

      <h1 className="establishment-name">{establishment.name}</h1>
      <ReactMarkdown>{establishment.address}</ReactMarkdown>

      <h4>Licenced to carry out:</h4>
      <ul>
        {
          ['procedure', 'breeding', 'supplying'].filter(auth => establishment[auth]).map(auth =>
            <li key={auth}>{content.licenced[auth]}</li>
          )
        }
      </ul>

      <section className="licence-holder">
        <h2>Establishment licence holder(s)</h2>
        {
          licenceHolders && licenceHolders.length > 0 ? (
            <p><strong>{licenceHolders.map(getName).join(', ')}</strong></p>
          ) : (
            <p>None.</p>
          )
        }
      </section>

      <section className="named-people break">
        <h2>Named people</h2>

        <h4>Named Person Responsible for Compliance</h4>
        <p>{ establishment.namedPeople.nprc.map(getName).join(', ') || 'None.' }</p>

        <h4>Named Information Officers</h4>
        <p>{ establishment.namedPeople.nio.map(getName).join(', ') || 'None.' }</p>

        <h4>Named Training and Competency Officers</h4>
        <p>{ establishment.namedPeople.ntco.map(getName).join(', ') || 'None.' }</p>

        <h4>Named Veternary Surgeons</h4>
        <p>{ establishment.namedPeople.nvs.map(getName).join(', ') || 'None.' }</p>

        <h4>Named Animal Care and Welfare Officers</h4>
        <p>{ establishment.namedPeople.nacwo.map(getName).join(', ') || 'None.' }</p>
      </section>

      {/* page break */}

      <section className="additional-conditions">
        <h2>Additional conditions</h2>
        {
          hasAdditionalConditions ? (
            <Fragment>
              <p>In addition to the standard conditions of Section 2C licences:</p>
              <div className="purple-inset">
                <ReactMarkdown>{establishment.conditions}</ReactMarkdown>
              </div>
            </Fragment>
          ) : (
            <p>None.</p>
          )
        }
      </section>

      <section className="authorisations break">
        <h2>Authorisations</h2>
        {
          hasAuthorisations ? (
            <Fragment>
              {
                !!killing.length &&
                  <Fragment>
                    <h3>Methods of killing not specified in Schedule 1</h3>
                    {
                      killing.map(({ method, description }, i) => (
                        <div className="purple-inset" key={i}>
                          <h4>{`Method ${i + 1}`}</h4>
                          <p>{ method }</p>
                          <h4>Type or description of the animals to which the killing method will be applied</h4>
                          <p>{ description }</p>
                        </div>
                      ))
                    }
                  </Fragment>
              }
              {
                !!rehomes.length &&
                  <Fragment>
                    <h3 className="rehomes">Setting free and rehoming of protected animals after completion of a series of regulated procedures</h3>
                    {
                      rehomes.map(({ method, description }, i) => (
                        <div className="purple-inset" key={i}>
                          <h4>Circumstances under which this may occur</h4>
                          <p>{ method }</p>
                          <h4>Animals to be set free or re-homed</h4>
                          <p>{ description }</p>
                        </div>
                      ))
                    }
                  </Fragment>
              }
            </Fragment>
          ) : (
            <p>None.</p>
          )
        }
      </section>

      {/* page break */}

      {
        hasApprovedAreas ? (
          <Fragment>
            {
              map(establishment.places, (places, siteName) => (
                <section className="approved-areas break" key={siteName}>
                  <h2>{`Approved areas ${continued()}`}</h2>
                  <table>
                    <thead>
                      <tr>
                        <th className="site" colSpan="6">{siteName}</th>
                      </tr>
                      <tr>
                        <th>Area</th>
                        <th>Name</th>
                        <th>Suitability</th>
                        <th>Holding</th>
                        <th>NACWO</th>
                        <th>Restrictions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        places.map(place => (
                          <tr key={place.id}>
                            <td>{place.area}</td>
                            <td>{place.name}</td>
                            <td>{place.suitability.join(', ')}</td>
                            <td>{place.holding.join(', ')}</td>
                            <td>{place.nacwo ? `${place.nacwo.firstName} ${place.nacwo.lastName}` : ''}</td>
                            <td>{place.restrictions}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </section>
              ))
            }
          </Fragment>
        ) : (
          <section className="approved-areas break">
            <h2>Approved areas</h2>
            <p>None.</p>
          </section>
        )
      }

      <StandardConditions title="Conditions in section 2C licences" conditions={content.standardConditions} className="break" />

    </Fragment>
  );
};

export default Establishment;
