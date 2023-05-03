import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import values from 'lodash/values';
import flatten from 'lodash/flatten';
import without from 'lodash/without';
import castArray from 'lodash/castArray';
import pick from 'lodash/pick';
import { Snippet, Inset, Link } from '@ukhomeoffice/asl-components';
import { projectSpecies } from '@asl/constants';
import { yesNoEmpty, yesNo } from '../../../procedures/list/formatters';

const ALL_SPECIES = flatten(values(projectSpecies));

function Section({ title, children, step }) {
  const editable = useSelector(state => state.model.status) === 'draft';
  return (
    <Fragment>
      <hr />
      {
        editable && <Link
          className="float-right"
          page="rops.confirm-update"
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

function List({ items }) {
  const listItems = items ? castArray(items) : [];

  if (!listItems.length) {
    return null;
  }

  if (listItems.length === 1) {
    return listItems[0].value;
  }

  return (
    <ul>
      {
        listItems.map((item, index) => <li key={index}>{item.value}</li>)
      }
    </ul>
  );
}

export default function Confirm({ isReview = false }) {
  const { year, hasNhps, species, schedule2Applicable } = useSelector(state => state.static);
  let rop = useSelector(state => state.model);
  const nilReturn = !rop.proceduresCompleted || !rop.postnatal;

  if (nilReturn) {
    // if the user configured the setup and then went back and submitted a nil return, ignore any setup after postnatal
    rop = pick(rop, ['id', 'projectId', 'status', 'year', 'proceduresCompleted', 'postnatal']);
  }

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

  function getRadioOption(field, val) {
    val = val || rop[field];
    if (!val) {
      return '-';
    }
    if (Array.isArray(val)) {
      if (!val.length) {
        return '-';
      }
      return <ul>
        {
          val.map(v => {
            return <li key={v}>{ getRadioOption(field, v) }</li>;
          })
        }
      </ul>;
    }
    return <Snippet fallback={`fields.${field}.options.${val}`}>{`fields.${field}.options.${val}.label`}</Snippet>;
  }

  const generalOnly = isReview || nilReturn;

  return (
    <div className="rop-summary">
      <Section title="General details" step="procedures">
        <dl className="inline">
          <dt>{`Procedures completed in ${year}`}</dt>
          <dd>{yesNoEmpty(rop.proceduresCompleted)}</dd>

          <dt>Postnatal or free feeding animals used</dt>
          <dd>{yesNoEmpty(rop.proceduresCompleted ? rop.postnatal : undefined)}</dd>

          <dt>Endangered animals used</dt>
          <dd>{yesNoEmpty(rop.endangered)}</dd>
          {
            rop.endangered && (
              <Fragment>
                <dt>Details of endangered animals used</dt>
                <dd>{rop.endangeredDetails}</dd>
              </Fragment>
            )
          }
          <dt>NMBAs used</dt>
          <dd>{yesNoEmpty(rop.nmbas)}</dd>
          {
            rop.nmbas && (
              <Fragment>
                <dt>General anaesthesia used throughout</dt>
                <dd>{yesNoEmpty(rop.generalAnaesthesia)}</dd>
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
          <dd>{yesNoEmpty(rop.rodenticide)}</dd>
          {
            rop.rodenticide && (
              <Fragment>
                <dt>Details of rodenticide trials</dt>
                <dd>{rop.rodenticideDetails}</dd>
              </Fragment>
            )
          }

          <dt>Special techniques used</dt>
          <dd>{yesNoEmpty(rop.productTesting)}</dd>
        </dl>
      </Section>
      {
        !generalOnly && (
          <Fragment>
            <Section title="Animals" step="species">
              <dl className="inline">
                <dt>Animal species</dt>
                <dd>
                  <ul>
                    {
                      (species || []).map((val, i) => {
                        const knownSpecies = ALL_SPECIES.find(s => s.value === val);
                        return <li key={i}>{knownSpecies ? knownSpecies.label : val}</li>;
                      })
                    }
                  </ul>
                </dd>

                <dt>Re-use</dt>
                <dd>{yesNo(rop.reuse)}</dd>

                <dt>Place of birth for animals not reused</dt>
                <dd>
                  {getRadioOption('placesOfBirth')}
                </dd>

                {
                  hasNhps && (
                    <Fragment>
                      <dt>Non-human primate (NHP) place of birth</dt>
                      <dd>{getRadioOption('nhpsOrigin')}</dd>

                      <dt>Non-human primate (NHP) source colony details</dt>
                      <dd>{getRadioOption('nhpsColonyStatus')}</dd>

                      <dt>Non-human primate (NHP) generation</dt>
                      <dd>{getRadioOption('nhpsGeneration')}</dd>
                    </Fragment>

                  )
                }

                <dt>Genetically altered animals used</dt>
                <dd>{yesNoEmpty(rop.ga)}</dd>

                {
                  schedule2Applicable && (
                    <Fragment>
                      <dt>Details of non-purpose bred Schedule 2 species used</dt>
                      <dd>{rop.scheduleTwoDetails}</dd>
                    </Fragment>
                  )
                }
              </dl>
            </Section>
            <Section title="Purposes" step="purposes">
              <dl className="inline">
                {
                  (rop.purposes || []).map((purpose, index) => (
                    <Fragment key={index}>
                      <dt>{`Purpose ${index + 1}`}</dt>
                      <dd>{getRadioOption('purposes', purpose)}</dd>
                      {
                        hasSubpurposes(purpose) && <dt>Sub-purposes</dt>
                      }
                      <dd>
                        <ul>
                          {
                            purpose === 'basic' && (rop.basicSubpurposes || []).map((sub, subIndex) => (
                              <li key={subIndex}>
                                {
                                  getRadioOption('basicSubpurposes', sub)
                                }
                                {
                                  sub === 'other' && <Inset><List items={rop.basicSubpurposesOther} /></Inset>
                                }
                              </li>
                            ))
                          }
                          {
                            purpose === 'regulatory' && (rop.regulatorySubpurposes || []).map((sub, subIndex) => (
                              <li key={subIndex}>
                                {
                                  getRadioOption('regulatorySubpurposes', sub)
                                }
                                {
                                  sub === 'routine-other' && <Inset><List items={rop.regulatorySubpurposesOther} /></Inset>
                                }
                                {
                                  sub === 'qc-other' && <Inset><List items={rop.regulatorySubpurposesQcOther} /></Inset>
                                }
                                {
                                  sub === 'other-efficacy' && <Inset><List items={rop.regulatorySubpurposesOtherEfficacy} /></Inset>
                                }
                                {
                                  sub === 'other-toxicity' && <Inset><List items={rop.regulatorySubpurposesOtherToxicity} /></Inset>
                                }
                                {
                                  sub === 'other-toxicity-ecotoxicity' && <Inset><List items={rop.regulatorySubpurposesOtherToxicityEcotoxicity} /></Inset>
                                }
                                {
                                  sub === 'other-toxicity-lethal' && <Inset><List items={rop.regulatorySubpurposesOtherToxicityLethal} /></Inset>
                                }
                              </li>
                            ))
                          }
                          {
                            purpose === 'translational' && (rop.translationalSubpurposes || []).map((sub, subIndex) => (
                              <li key={subIndex}>
                                {
                                  getRadioOption('translationalSubpurposes', sub)
                                }
                                {
                                  sub === 'other' && <Inset><List items={rop.translationalSubpurposesOther} /></Inset>
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
                                  (rop.regulatoryLegislation || []).map((leg, index) => (
                                    <li key={index}>
                                      {
                                        getRadioOption('regulatoryLegislation', leg)
                                      }
                                      {
                                        leg === 'other' && <Inset><List items={rop.regulatoryLegislationOther} /></Inset>
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
                                  (rop.regulatoryLegislationOrigin || []).map((leg, index) => (
                                    <li key={index}>{getRadioOption('regulatoryLegislationOrigin', leg)}</li>
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
                <dd>{yesNoEmpty(rop.newGeneticLine)}</dd>
              </dl>
            </Section>
            {
              rop.productTesting && (
                <Section title="Techniques" step="techniques">
                  <dl className="inline">
                    <dt>Techniques of special interest used</dt>
                    <dd>
                      {getRadioOption('productTestingTypes')}
                    </dd>
                  </dl>
                </Section>
              )
            }
            <hr />
          </Fragment>
        )
      }
    </div>
  );
}
