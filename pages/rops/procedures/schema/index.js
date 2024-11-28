const { get, flatten, omit } = require('lodash');
const { projectSpecies } = require('@ukhomeoffice/asl-constants');
const { toArray, toBoolean } = require('../../../../lib/utils');
const { hasNhps, getSpecies } = require('../../helpers');
const content = require('../create/content');

const allSpecies = flatten(Object.values(projectSpecies));

function getReuse(key, req) {
  const nhps = hasNhps(req, key);
  const placesOfBirth = get(req, 'rop.placesOfBirth') || [];

  if (!req.rop.reuse) {
    if (nhps) {
      return {};
    }
    return {
      placesOfBirth: {
        inputType: 'radioGroup',
        prefix: key,
        hint: false,
        validate: [
          'required'
        ],
        options: placesOfBirth
      }
    };
  }

  return {
    reuse: {
      inputType: 'radioGroup',
      prefix: key,
      automapReveals: true,
      format: toBoolean,
      validate: [
        'required'
      ],
      options: [
        {
          value: true,
          label: 'Yes'
        },
        {
          value: false,
          label: 'No',
          reveal: !nhps && {
            placesOfBirth: {
              inputType: 'radioGroup',
              prefix: key,
              hint: false,
              validate: [
                'required'
              ],
              options: placesOfBirth
            }
          }
        }
      ]
    }
  };
}

function getNhpQs(key, req) {
  if (!hasNhps(req, key)) {
    return {};
  }
  const nhpsOrigin = get(req, 'rop.nhpsOrigin') || [];
  const nhpsColonyStatus = get(req, 'rop.nhpsColonyStatus') || [];
  const nhpsGeneration = get(req, 'rop.nhpsGeneration') || [];

  return {
    nhpsOrigin: {
      inputType: 'radioGroup',
      prefix: key,
      validate: [
        'required'
      ],
      options: nhpsOrigin
    },
    nhpsColonyStatus: {
      inputType: 'radioGroup',
      prefix: key,
      validate: [
        'required'
      ],
      options: nhpsColonyStatus
    },
    nhpsGeneration: {
      inputType: 'radioGroup',
      prefix: key,
      validate: [
        'required'
      ],
      options: nhpsGeneration
    }
  };
}

function getPurposes(req) {
  const purposes = get(req, 'rop.purposes') || [];
  const basicSubpurposes = get(req, 'rop.basicSubpurposes') || [];
  const regulatorySubpurposes = get(req, 'rop.regulatorySubpurposes') || [];
  const regulatoryLegislation = get(req, 'rop.regulatoryLegislation') || [];
  const regulatoryLegislationOrigin = get(req, 'rop.regulatoryLegislationOrigin') || [];
  const translationalSubpurposes = get(req, 'rop.translationalSubpurposes') || [];

  const nopes = [
    'routine-blood',
    'routine-monoclonal',
    'routine-other'
  ];

  function getOtherField(name, field, reveal) {
    let options = (get(req, `rop.${field}`) || []).map(item => ({ value: item.id, label: item.value }));
    if (reveal) {
      options = options.map(opt => ({ ...opt, reveal }));
    }
    return {
      [name]: {
        inputType: 'radioGroup',
        automapReveals: true,
        validate: ['required'],
        label: '',
        options
      }
    };
  }

  const legislationFields = {
    regulatoryLegislation: {
      inputType: 'radioGroup',
      hint: false,
      automapReveals: true,
      options: regulatoryLegislation.map(rl => {
        if (rl === 'other') {
          return {
            value: rl,
            reveal: getOtherField('legislationOther', 'regulatoryLegislationOther')
          };
        }
        return rl;
      })
    },
    regulatoryLegislationOrigin: {
      inputType: 'radioGroup',
      hint: false,
      options: regulatoryLegislationOrigin
    }
  };

  return purposes.map(p => {
    if (p === 'basic') {
      return {
        value: p,
        reveal: {
          basicSubpurposes: {
            inputType: 'radioGroup',
            automapReveals: true,
            validate: ['required'],
            hint: false,
            options: basicSubpurposes.map(bs => {
              if (bs === 'other') {
                return {
                  value: bs,
                  reveal: getOtherField('subpurposeOther', 'basicSubpurposesOther')
                };
              }
              return bs;
            })
          }
        }
      };
    }
    if (p === 'regulatory') {
      return {
        value: p,
        reveal: {
          regulatorySubpurposes: {
            inputType: 'radioGroup',
            automapReveals: true,
            validate: ['required'],
            hint: false,
            options: regulatorySubpurposes.map(rs => {
              if (rs === 'routine-other') {
                return {
                  value: rs,
                  reveal: getOtherField('subpurposeOther', 'regulatorySubpurposesOther')
                };
              }
              if (nopes.includes(rs)) {
                return rs;
              }
              if (rs === 'qc-other') {
                return {
                  value: rs,
                  reveal: getOtherField('subpurposeOther', 'regulatorySubpurposesQcOther', legislationFields)
                };
              }
              if (rs === 'other-efficacy') {
                return {
                  value: rs,
                  reveal: getOtherField('subpurposeOther', 'regulatorySubpurposesOtherEfficacy', legislationFields)
                };
              }
              if (rs === 'other-toxicity-ecotoxicity') {
                return {
                  value: rs,
                  reveal: getOtherField('subpurposeOther', 'regulatorySubpurposesOtherToxicityEcotoxicity', legislationFields)
                };
              }
              if (rs === 'other-toxicity') {
                return {
                  value: rs,
                  reveal: getOtherField('subpurposeOther', 'regulatorySubpurposesOtherToxicity', legislationFields)
                };
              }
              if (rs === 'other-toxicity-lethal') {
                return {
                  value: rs,
                  reveal: getOtherField('subpurposeOther', 'regulatorySubpurposesOtherToxicityLethal', legislationFields)
                };
              }
              return {
                value: rs,
                reveal: legislationFields
              };
            })
          }
        }
      };
    }
    if (p === 'translational') {
      return {
        value: p,
        reveal: {
          translationalSubpurposes: {
            inputType: 'radioGroup',
            validate: ['required'],
            automapReveals: true,
            hint: false,
            options: translationalSubpurposes.map(ts => {
              if (ts === 'other') {
                return {
                  value: ts,
                  reveal: getOtherField('subpurposeOther', 'translationalSubpurposesOther')
                };
              }
              return ts;
            })
          }
        }
      };
    }
    return p;
  });
}

module.exports = (req, addMultiple) => {
  const hasGa = get(req, 'rop.ga', false);
  const hasEndangered = get(req, 'rop.endangered', false);
  const species = getSpecies(req);
  const newGeneticLine = req.rop.newGeneticLine;
  const newGeneticLineOptions = newGeneticLine ? [false, true] : [false];

  const usesSpecialTechniques = req.rop.productTesting || (req.rop.productTestingTypes || []).length;

  const schema = {
    species: {
      inputType: 'radioGroup',
      validate: [
        'required'
      ],
      automapReveals: true,
      options: species.map(s => {
        const obj = allSpecies.find(as => as.value === s);
        return {
          value: s,
          label: obj ? obj.label : s,
          reveal: {
            ...getNhpQs(s, req),
            ...getReuse(s, req)
          }
        };
      })
    },
    endangered: {
      inputType: 'radioGroup',
      format: toBoolean,
      options: [
        true,
        false
      ].filter(opt => hasEndangered || opt === false),
      validate: [
        'required'
      ]
    },
    ga: {
      inputType: 'radioGroup',
      validate: [
        'required'
      ],
      options: [
        'no-ga',
        'ga-not-harmful',
        'ga-harmful'
      ].filter(opt => hasGa || opt === 'no-ga')
    },
    purposes: {
      inputType: 'radioGroup',
      automapReveals: true,
      hint: false,
      validate: [
        'required'
      ],
      options: getPurposes(req)
    },
    newGeneticLine: {
      inputType: 'radioGroup',
      validate: ['required'],
      format: toBoolean,
      options: newGeneticLineOptions
    },
    specialTechniqueUsed: {
      inputType: 'radioGroup',
      validate: ['required'],
      format: toBoolean,
      automapReveals: true,
      options: [
        {
          value: true,
          reveal: {
            specialTechnique: {
              inputType: 'radioGroup',
              validate: ['required'],
              options: req.rop.productTestingTypes
            }
          }
        },
        false
      ]
    },
    severity: {
      inputType: addMultiple ? 'checkboxGroup' : 'radioGroup',
      format: v => addMultiple ? toArray(v) : v,
      automapReveals: true,
      validate: [
        'required'
      ],
      options: [
        'sub',
        'mild',
        'moderate',
        'severe',
        'non'
      ].map(s => {
        return {
          value: s,
          reveal: {
            severityNum: {
              prefix: s,
              inputType: 'inputText',
              validate: ['required', { type: 'number' }],
              format: v => v ? parseInt(v, 10) : v,
              label: content.fields.severityNum[s] && content.fields.severityNum[s].label
            },
            addNote: {
              inputType: 'detailsReveal',
              label: 'Add note',
              reveal: {
                severityHoNote: {
                  prefix: s,
                  inputType: 'textarea'
                },
                severityPersonalNote: {
                  prefix: s,
                  inputType: 'textarea'
                }
              }
            }
          }
        };
      })
    }
  };

  return usesSpecialTechniques ? schema : omit(schema, 'specialTechniqueUsed');
};
