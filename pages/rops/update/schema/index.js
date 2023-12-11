const { flatten, get, intersection, every, omit } = require('lodash');
const { toBoolean, toArray } = require('../../../../lib/utils');
const content = require('../content');

const { projectSpecies } = require('@ukhomeoffice/asl-constants');

module.exports = req => {
  const disableProcOpts = fieldName => optParam => {
    const field = req.rop.procedures.map(p => p[fieldName]);
    const opt = typeof optParam === 'string' ? { value: optParam } : optParam;

    if (field.includes(opt.value)) {
      return {
        ...opt,
        disabled: true,
        warning: content.fields.disabledWarning
      };
    }
    return opt;
  };

  function getOtherField(_fieldName) {
    const procIds = flatten(req.rop.procedures.map(p => [p.subpurposeOther, p.legislationOther])).filter(Boolean);
    return {
      inputType: 'multiInput',
      disabled: procIds,
      disabledWarning: content.fields.disabledWarning,
      nullValue: [],
      format: JSON.parse,
      objectItems: true,
      validate: ['required']
    };
  }

  function getSpeciesField() {
    const species = omit(projectSpecies, 'deprecated');
    species.OTHER = [
      { label: 'Other carnivores', value: 'other-carnivores' },
      { label: 'Other mammals', value: 'other-mammals' }
    ];
    return {
      species: {
        inputType: 'speciesSelector',
        projectSpecies: true,
        species,
        presets: (req.version.data.species || []).find(s => s.includes('other'))
          // don't add species from project if "other" values are selected
          ? req.rop.procedures.map(p => p.species)
          : [
            ...(req.version.data.species || []),
            ...(req.rop.procedures.map(p => p.species))
          ],
        format: JSON.parse,
        validate: [
          {
            customValidate: val => {
              if (!flatten(Object.values(val || {})).length) {
                return false;
              }
              const others = val.precoded.filter(s => s.includes('other-'));
              return every(others, key => (val[`species-${key}`] || []).length);
            }
          }
        ]
      }
    };
  }

  function getSpecies() {
    const isLegacy = req.rop.project.schemaVersion === 0;
    const hasOtherSpecies = (get(req.version, 'data.species-other') || []).length ||
      (get(req.version, 'data.species') || []).find(s => s.includes('other'));

    if (isLegacy || hasOtherSpecies) {
      return getSpeciesField();
    }

    const ropSpecies = flatten(Object.values(req.rop.species || {}));
    // cannot select "no other species" as already added to procs
    const disableOtherSpecies = !!intersection(ropSpecies, req.rop.procedures.map(p => p.species)).length;

    return {
      otherSpecies: {
        inputType: 'radioGroup',
        format: toBoolean,
        automapReveals: true,
        validate: [
          'required',
          {
            customValidate: value => {
              const projectSpecies = [
                ...(req.version.data.species || []).filter(s => !s.includes('other')),
                ...(req.rop.procedures.map(p => p.species))
              ];

              return !(value === false && projectSpecies.length === 0);
            }
          }
        ],
        disabled: true,
        options: [
          {
            value: false,
            disabled: disableOtherSpecies
          },
          {
            value: true,
            reveal: getSpeciesField()
          }
        ]
      }
    };
  }

  const schema = {
    proceduresCompleted: {
      inputType: 'radioGroup',
      format: toBoolean,
      options: [
        true,
        false
      ],
      validate: [
        'required'
      ]
    },
    postnatal: {
      inputType: 'radioGroup',
      format: toBoolean,
      options: [
        true,
        false
      ],
      validate: [
        'required'
      ]
    },
    endangered: {
      inputType: 'radioGroup',
      format: toBoolean,
      automapReveals: true,
      options: [
        false,
        {
          value: true,
          reveal: {
            endangeredDetails: {
              inputType: 'textarea',
              validate: [
                'required'
              ]
            }
          }
        }
      ],
      validate: [
        'required'
      ]
    },
    nmbas: {
      inputType: 'radioGroup',
      format: toBoolean,
      automapReveals: true,
      validate: [
        'required'
      ],
      options: [
        false,
        {
          value: true,
          reveal: {
            generalAnaesthesia: {
              inputType: 'radioGroup',
              format: toBoolean,
              automapReveals: true,
              validate: [
                'required'
              ],
              options: [
                true,
                {
                  value: false,
                  reveal: {
                    generalAnaesthesiaDetails: {
                      inputType: 'textarea',
                      validate: [
                        'required'
                      ]
                    }
                  }
                }
              ]
            }
          }
        }
      ]
    },
    rodenticide: {
      inputType: 'radioGroup',
      format: toBoolean,
      automapReveals: true,
      validate: [
        'required'
      ],
      options: [
        false,
        {
          value: true,
          reveal: {
            rodenticideDetails: {
              inputType: 'textarea',
              validate: [
                'required'
              ]
            }
          }
        }
      ]
    },
    productTesting: {
      inputType: 'radioGroup',
      format: toBoolean,
      automapReveals: true,
      validate: [
        'required'
      ],
      options: [
        false,
        true
      ]
    },
    ...getSpecies(),
    reuse: {
      inputType: 'radioGroup',
      format: toBoolean,
      automapReveals: true,
      validate: [
        'required'
      ],
      options: [
        false,
        true
      ]
    },
    placesOfBirth: {
      inputType: 'checkboxGroup',
      format: toArray,
      automapReveals: true,
      validate: [
        'required'
      ],
      options: [
        'uk-licenced',
        'eu-registered',
        'uk-non-licenced',
        'eu-non-registered',
        'europe',
        'rest-of-world'
      ].map(disableProcOpts('placesOfBirth'))
    },
    scheduleTwoDetails: {
      inputType: 'textarea'
    },
    nhpsOrigin: {
      inputType: 'checkboxGroup',
      format: toArray,
      validate: [
        'required'
      ],
      options: [
        'uk-licenced',
        'eu-licenced',
        'uk-non-licenced',
        'eu-non-licenced',
        'europe',
        'asia',
        'america',
        'africa',
        'elsewhere'
      ]
    },
    nhpsColonyStatus: {
      inputType: 'checkboxGroup',
      format: toArray,
      validate: [
        'required'
      ],
      options: [
        'self-sustaining',
        'non-self-sustaining'
      ]
    },
    nhpsGeneration: {
      inputType: 'checkboxGroup',
      format: toArray,
      validate: [
        'required'
      ],
      options: [
        'f0',
        'f1',
        'f2'
      ]
    },
    ga: {
      inputType: 'radioGroup',
      format: toBoolean,
      validate: [
        'required'
      ],
      options: [
        false,
        true
      ]
    },
    purposes: {
      inputType: 'checkboxGroup',
      format: toArray,
      validate: [
        'required'
      ],
      options: [
        'basic',
        'translational',
        'protection',
        'preservation',
        'education_or_training',
        'forensic',
        'breeding',
        'regulatory'
      ].map(disableProcOpts('purposes'))
    },
    basicSubpurposes: {
      inputType: 'checkboxGroup',
      format: toArray,
      automapReveals: true,
      validate: [
        'required'
      ],
      options: [
        'oncology',
        'cardio',
        'nervous',
        'respiratory',
        'gastro',
        'musculoskeletal',
        'dentistry',
        'immune',
        'urogenital',
        'sensory',
        'endocrine',
        'multisystemic',
        'ethology',
        'developmental',
        {
          value: 'other',
          reveal: {
            basicSubpurposesOther: getOtherField('basicSubpurposes')
          }
        }
      ].map(disableProcOpts('basicSubpurposes'))
    },
    regulatorySubpurposes: {
      inputType: 'checkboxGroup',
      format: toArray,
      automapReveals: true,
      validate: [
        'required'
      ],
      options: [
        'routine-blood',
        'routine-monoclonal',
        {
          value: 'routine-other',
          reveal: {
            regulatorySubpurposesOther: getOtherField('regulatorySubpurposes')
          }
        },
        'qc-batch-safety',
        'qc-pyrogenicity',
        'qc-batch-potency',
        {
          value: 'qc-other',
          reveal: {
            regulatorySubpurposesQcOther: getOtherField('regulatorySubpurposes')
          }
        },
        {
          value: 'other-efficacy',
          reveal: {
            regulatorySubpurposesOtherEfficacy: getOtherField('regulatorySubpurposes')
          }
        },
        'toxicity-ld50',
        {
          value: 'other-toxicity-lethal',
          reveal: {
            regulatorySubpurposesOtherToxicityLethal: getOtherField('regulatorySubpurposes')
          }
        },
        'toxicity-non-lethal',
        'toxicity-skin',
        'toxicity-skin-sensation',
        'toxicity-eye-irritation',
        'toxicity-repeated-lt-29',
        'toxicity-repeated-29-90',
        'toxicity-repeated-mt-90',
        'toxicity-carcinogenicity',
        'toxicity-genotoxicity',
        'toxicity-reproductive',
        'toxicity-developmental',
        'toxicity-neurotoxicity',
        'toxicity-kinetics',
        'toxicity-pharmaco-dynamics',
        'toxicity-phototoxicity',
        'toxicity-ecotoxicity-acute',
        'toxicity-ecotoxicity-chronic',
        'toxicity-ecotoxicity-reproductive',
        'toxicity-ecotoxicity-endochronic',
        'toxicity-ecotoxicity-bioaccumulation',
        {
          value: 'other-toxicity-ecotoxicity',
          reveal: {
            regulatorySubpurposesOtherToxicityEcotoxicity: getOtherField('regulatorySubpurposes')
          }
        },
        'toxicity-safety-testing',
        'toxicity-target-animal',
        {
          value: 'other-toxicity',
          reveal: {
            regulatorySubpurposesOtherToxicity: getOtherField('regulatorySubpurposes')
          }
        },
        'combined-end-points'
      ].map(disableProcOpts('regulatorySubpurposes'))
    },
    regulatoryLegislation: {
      inputType: 'checkboxGroup',
      format: toArray,
      automapReveals: true,
      validate: [
        'required'
      ],
      options: [
        'human-use',
        'veterinary-use',
        'medical-devices',
        'industrial-chemicals',
        'plant-protection',
        'biocides',
        'food',
        'feed',
        'cosmetics',
        {
          value: 'other',
          reveal: {
            regulatoryLegislationOther: getOtherField('regulatoryLegislation')
          }
        }
      ].map(disableProcOpts('regulatoryLegislation'))
    },
    regulatoryLegislationOrigin: {
      inputType: 'checkboxGroup',
      format: toArray,
      automapReveals: true,
      validate: [
        'required'
      ],
      options: [
        'uk',
        'eu',
        'non-eu'
      ].map(disableProcOpts('regulatoryLegislationOrigin'))
    },
    translationalSubpurposes: {
      inputType: 'checkboxGroup',
      format: toArray,
      automapReveals: true,
      validate: [
        'required'
      ],
      options: [
        'cancer',
        'infectious',
        'cardio',
        'nervous',
        'respiratory',
        'gastro',
        'musculoskeletal',
        'dentistry',
        'immune',
        'urogenital',
        'sensory',
        'endocrine',
        {
          value: 'other',
          reveal: {
            translationalSubpurposesOther: getOtherField('translationalSubpurposes')
          }
        },
        'animal-diseases',
        'animal-welfare',
        'animal-nutrition',
        'diagnosis',
        'plant',
        'non-reg-tox'
      ].map(disableProcOpts('translationalSubpurposes'))
    },
    newGeneticLine: {
      inputType: 'radioGroup',
      format: toBoolean,
      validate: [
        'required'
      ],
      options: [
        false,
        true
      ]
    },
    productTestingTypes: {
      inputType: 'checkboxGroup',
      format: toArray,
      validate: [
        'required'
      ],
      options: [
        'household',
        'tobacco',
        'alcohol',
        'antibodies'
      ].map(disableProcOpts('specialTechnique'))
    }
  };

  // new genetic line question should only be asked for basic or translational research
  const purposes = get(req, 'rop.purposes') || [];
  return (purposes.includes('basic') || purposes.includes('translational')) ? schema : omit(schema, 'newGeneticLine');
};
