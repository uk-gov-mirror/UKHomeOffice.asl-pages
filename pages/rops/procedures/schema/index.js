const { get, flatten } = require('lodash');
const { projectSpecies } = require('@asl/constants');
const { toArray, toBoolean } = require('../../../../lib/utils');
const { hasNhps } = require('../../helpers');
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
  const basicSubpurposesOther = get(req, 'rop.basicSubpurposesOther');
  const regulatorySubpurposes = get(req, 'rop.regulatorySubpurposes') || [];
  const regulatorySubpurposesOther = get(req, 'rop.regulatorySubpurposesOther');
  const regulatoryLegislation = get(req, 'rop.regulatoryLegislation') || [];
  const regulatoryLegislationOther = get(req, 'rop.regulatoryLegislationOther');
  const regulatoryLegislationOrigin = get(req, 'rop.regulatoryLegislationOrigin') || [];
  const translationalSubpurposes = get(req, 'rop.translationalSubpurposes') || [];
  const translationalSubpurposesOther = get(req, 'rop.translationalSubpurposesOther');

  const nopes = [
    'routine-blood',
    'routine-monoclonal',
    'routine-other'
  ];

  return purposes.map(p => {
    if (p === 'basic') {
      return {
        value: p,
        reveal: {
          basicSubpurposes: {
            inputType: 'radioGroup',
            automapReveals: true,
            validate: ['required'],
            options: basicSubpurposes.map(bs => {
              if (bs === 'other') {
                return {
                  value: bs,
                  hint: basicSubpurposesOther
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
                  hint: regulatorySubpurposesOther
                };
              }
              if (!nopes.includes(rs)) {
                return {
                  value: rs,
                  reveal: {
                    regulatoryLegislation: {
                      inputType: 'radioGroup',
                      hint: false,
                      options: regulatoryLegislation.map(rl => {
                        if (rl === 'other') {
                          return {
                            value: rl,
                            hint: regulatoryLegislationOther
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
                  }
                };
              }
              return rs;
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
            hint: false,
            options: translationalSubpurposes.map(ts => {
              if (ts === 'other') {
                return {
                  value: ts,
                  hint: translationalSubpurposesOther
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
  const projectSpecies = (get(req, 'project.granted.data.species') || []).filter(s => !s.includes('other'));
  const ropSpecies = flatten(Object.values(get(req, 'rop.species') || {})).filter(s => !s.match(/^other-/));

  const hasGa = get(req, 'rop.ga', false);
  const species = [
    ...projectSpecies,
    ...ropSpecies
  ];
  const newGeneticLine = req.rop.newGeneticLine;
  const newGeneticLineOptions = newGeneticLine ? [false, true] : [false];
  return {
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
};
