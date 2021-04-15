const { flatten, get } = require('lodash');
const { toBoolean, toArray } = require('../../../../lib/utils');

module.exports = req => {
  const disableProcOpts = fieldName => opt => {
    const field = req.rop.procedures.map(p => p[fieldName]);
    if (typeof opt === 'string') {
      opt = { value: opt };
    }
    if (field.includes(opt.value)) {
      return {
        ...opt,
        disabled: true
      };
    }
    return opt;
  };

  function getOtherField(fieldName, option) {
    return {
      inputType: 'inputText',
      disabled: req.rop.procedures.map(p => p[fieldName]).includes(option),
      validate: [
        {
          validator: 'required',
          params: {
            valFromModel: true
          }
        }
      ]
    };
  }

  function getSpeciesField() {
    return {
      species: {
        inputType: 'speciesSelector',
        projectSpecies: true,
        presets: [
          ...(req.version.data.species || []).filter(s => !s.includes('other')),
          ...(req.rop.procedures.map(p => p.species))
        ],
        format: JSON.parse,
        validate: [
          {
            customValidate: val => {
              return !!flatten(Object.values(val)).length;
            }
          }
        ]
      }
    };
  }

  function getSpecies() {
    const isLegacy = req.rop.project.schemaVersion === 0;
    const hasOtherSpecies = get(req.version, 'data.species-other', []).length ||
      get(req.version, 'data.species', []).find(s => s.includes('other'));

    if (isLegacy || hasOtherSpecies) {
      return getSpeciesField();
    }

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

              if (value === false && projectSpecies.length === 0) {
                return false; // user must add species if none are present
              }

              return true;
            }
          }
        ],
        options: [
          false,
          {
            value: true,
            reveal: getSpeciesField()
          }
        ]
      }
    };
  }

  return {
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
        true,
        false
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
        'regulatory',
        'translational',
        'breeding',
        'protection',
        'preservation',
        'education',
        'training',
        'forensic'
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
        {
          value: 'other',
          reveal: {
            basicSubpurposesOther: getOtherField('basicSubpurposes', 'other')
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
            regulatorySubpurposesOther: getOtherField('regulatorySubpurposes', 'routine-other')
          }
        },
        'qc-batch-safety',
        'qc-pyrogenicity',
        'qc-batch-potency',
        'qc-other',
        'other-efficacy',
        'toxicity-ld50',
        'toxicity-other-lethal',
        'toxicity-non-lethal',
        'toxicity-skin'
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
            regulatoryLegislationOther: getOtherField('regulatoryLegislation', 'other')
          }
        }
      ].map(disableProcOpts('regulatorySubpurposes'))
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
      ]
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
            translationalSubpurposesOther: getOtherField('translationalSubpurposes', 'other')
          }
        },
        'animal-diseases',
        'animal-welfare',
        'animal-nutrition',
        'diagnosis',
        'plant',
        'non-reg-tox'
      ]
    },
    newGeneticLine: {
      inputType: 'radioGroup',
      format: toBoolean,
      validate: [
        'required'
      ],
      options: [
        true,
        false
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
      ]
    }
  };
};
