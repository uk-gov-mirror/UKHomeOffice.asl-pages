import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import values from 'lodash/values';
import flatten from 'lodash/flatten';
import omit from 'lodash/omit';
import without from 'lodash/without';
import { Snippet, Inset, Link } from '@asl/components';
import { projectSpecies } from '@asl/constants';

function yn(val) {
  if (val === true) {
    return 'Yes';
  }
  if (val === false) {
    return 'No';
  }
  return '-';
}

const ALL_SPECIES = flatten(values(projectSpecies));

function Section({ title, children, step }) {
  const editable = useSelector(state => state.static.rop.status) === 'draft';
  return (
    <Fragment>
      <hr />
      {
        editable && <Link
          className="float-right"
          page="rops.update"
          label={`Edit ${title.toLowerCase()}`}
          step={step}
        />
      }
      <h2>{title}</h2>
      {
        children
      }
    </Fragment>
  );
}

export default function Confirm() {
  const { year, rop } = useSelector(state => state.static);
  const projSpecies = get(rop, 'project.granted.data.species', []);
  const ropSpecies = get(rop, 'species.precoded', []);
  const otherSpecies = get(rop, 'species.otherSpecies', []);

  const ropCustom = [
    ...otherSpecies,
    ...flatten(values(omit(rop.species, 'precoded', 'otherSpecies')))
  ];

  const precoded = [ ...projSpecies, ...ropSpecies ]
    .filter(s => !s.includes('other'))
    .map(val => ALL_SPECIES.find(s => s.value === val).label);

  const species = [
    ...precoded,
    ...ropCustom
  ];

  const yeps = [
    'routine-blood',
    'routine-monoclonal',
    'routine-other'
  ];

  function hasSubpurposes(purpose) {
    return ['basic', 'regulatory', 'translational'].includes(purpose);
  }

  // eslint-disable-next-line no-useless-call
  const shouldShowLegislation = !!without.apply(null, [rop.regulatorySubpurposes, ...yeps]).length;

  return (
    <div className="rop-summary">
      <Section title="General details" step="procedures">
        <dl className="inline">
          <dt>Procedures completed in {year}</dt>
          <dd>Yes</dd>

          <dt>Only protected embryonic forms used</dt>
          <dd>{yn(!rop.postnatal)}</dd>

          <dt>Endangered animals used</dt>
          <dd>{yn(rop.endangered)}</dd>
          {
            rop.endangered && (
              <Fragment>
                <dt>Details of endangered animals used</dt>
                <dd>{rop.endangeredDetails}</dd>
              </Fragment>
            )
          }
          <dt>NMBAs used</dt>
          <dd>{yn(rop.nmbas)}</dd>
          {
            rop.nmbas && (
              <Fragment>
                <dt>General anaesthesia used throughout</dt>
                <dd>{yn(rop.generalAnaesthesia)}</dd>
                {
                  !rop.generalAnaesthesia && (
                    <Fragment>
                      <dt>Reason general anaesthesia not used throughout</dt>
                      <dd>{rop.generalAnaesthesiaDetails}</dd>
                    </Fragment>
                  )
                }
              </Fragment>
            )
          }

          <dt>Rodenticide trials carried out</dt>
          <dd>{yn(rop.rodenticide)}</dd>
          {
            rop.rodenticide && (
              <Fragment>
                <dt>Details of rodenticide trials</dt>
                <dd>{rop.rodenticideDetails}</dd>
              </Fragment>
            )
          }

          <dt>Techniques</dt>
          <dd>{yn(rop.productTesting)}</dd>
        </dl>
      </Section>
      <Section title="Animals" step="species">
        <dl className="inline">
          <dt>Animal species</dt>
          <dd>
            <ul>{species.map((s, i) => <li key={i}>{s}</li>)}</ul>
          </dd>

          <dt>Re-use</dt>
          <dd>{yn(rop.reuse)}</dd>

          <dt>Place of birth for animals not reused</dt>
          <dd>
            {
              rop.placesOfBirth
                ? (
                  <ul>
                    {
                      rop.placesOfBirth.map((p, i) => <li key={i}><Snippet fallback={`fields.placesOfBirth.options.${p}`}>{`fields.placesOfBirth.options.${p}.label`}</Snippet></li>)
                    }
                  </ul>
                )
                : '-'
            }
          </dd>

          <dt>Genetically altered animals used</dt>
          <dd>{yn(rop.ga)}</dd>
        </dl>
      </Section>
      <Section title="Purposes" step="purposes">
        <dl className="inline">
          {
            (rop.purposes || []).map((purpose, index) => (
              <Fragment key={index}>
                <dt>Purpose {index + 1}</dt>
                <dd><Snippet fallback={`fields.purposes.options.${purpose}`}>{`fields.purposes.options.${purpose}.label`}</Snippet></dd>
                {
                  hasSubpurposes(purpose) && <dt>Subpurposes</dt>
                }
                <dd>
                  <ul>
                    {
                      purpose === 'basic' && rop.basicSubpurposes.map((sub, subIndex) => (
                        <li key={subIndex}>
                          <Snippet fallback={`fields.basicSubpurposes.options.${sub}`}>{`fields.basicSubpurposes.options.${sub}.label`}</Snippet>
                          {
                            sub === 'other' && <Inset>{rop.basicSubpurposesOther}</Inset>
                          }
                        </li>
                      ))
                    }
                    {
                      purpose === 'regulatory' && rop.regulatorySubpurposes.map((sub, subIndex) => (
                        <li key={subIndex}>
                          <Snippet fallback={`fields.regulatorySubpurposes.options.${sub}`}>{`fields.regulatorySubpurposes.options.${sub}.label`}</Snippet>
                          {
                            sub === 'routine-other' && <Inset>{rop.regulatorySubpurposesOther}</Inset>
                          }
                        </li>
                      ))
                    }
                    {
                      purpose === 'translational' && rop.translationalSubpurposes.map((sub, subIndex) => (
                        <li key={subIndex}>
                          <Snippet fallback={`fields.translationalSubpurposes.options.${sub}`}>{`fields.translationalSubpurposes.options.${sub}.label`}</Snippet>
                          {
                            sub === 'translational-other' && <Inset>{rop.translationalSubpurposesOther}</Inset>
                          }
                        </li>
                      ))
                    }
                  </ul>
                </dd>
                {
                  purpose === 'regulatory' && shouldShowLegislation && (
                    <Fragment>
                      <dt>Type of legislation</dt>
                      <dd>
                        <ul>
                          {
                            rop.regulatoryLegislation.map((leg, index) => (
                              <li key={index}>
                                <Snippet fallback={`fields.regulatoryLegislation.options.${leg}`}>{`fields.regulatoryLegislation.options.${leg}.label`}</Snippet>
                                {
                                  leg === 'other' && <Inset>{rop.regulatoryLegislationOther}</Inset>
                                }
                              </li>
                            ))
                          }
                        </ul>
                      </dd>
                      <dt>Origin of legislation</dt>
                      <dd>
                        <ul>
                          {
                            rop.regulatoryLegislationOrigin.map((leg, index) => (
                              <li key={index}><Snippet fallback={`fields.regulatoryLegislationOrigin.options.${leg}`}>{`fields.regulatoryLegislationOrigin.options.${leg}.label`}</Snippet></li>
                            ))
                          }
                        </ul>
                      </dd>
                    </Fragment>
                  )
                }
              </Fragment>
            ))
          }
          <dt>Creation of new genetic line</dt>
          <dd>{yn(rop.newGeneticLine)}</dd>
        </dl>
      </Section>
      {
        rop.productTesting && (
          <Section title="Techniques" step="techniques">
            <dl className="inline">
              <dt>Techniques of special interest used</dt>
              <dd>
                <ul>
                  {
                    rop.productTestingTypes.map((t, i) => (
                      <li key={i}><Snippet fallback={`fields.productTestingTypes.options.${t}`}>{`fields.productTestingTypes.options.${t}.label`}</Snippet></li>
                    ))
                  }
                </ul>
              </dd>
            </dl>
          </Section>
        )
      }
      <hr />
    </div>
  );
}
