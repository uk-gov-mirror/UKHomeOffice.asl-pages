const { merge } = require('lodash');
const baseContent = require('../../content');

// provide contractions for list views
const condensedFields = merge({}, baseContent.fields, {
  placesOfBirth: {
    options: {
      'uk-licenced': {
        label: 'UK, licensed establishment'
      },
      'eu-registered': 'EU, licensed establishment',
      'uk-non-licenced': {
        label: 'UK, not licensed establishment'
      },
      'eu-non-registered': 'EU, not registered breeder',
      'europe': 'Europe (not EU)',
      'rest-of-world': 'Outside Europe'
    }
  },
  nhpsOrigin: {
    options: {
      'uk-licenced': 'UK, licensed establishment',
      'eu-licenced': 'EU, licensed establishment',
      'uk-non-licenced': 'UK, not licensed establishment',
      'eu-non-licenced': 'EU, not licensed establishment',
      'europe': 'Europe (not EU)',
      'asia': 'Asia',
      'america': 'America',
      'africa': 'Africa',
      'elsewhere': 'Elsewhere'
    }
  },
  specialTechnique: baseContent.fields.productTestingTypes,
  nhpsColonyStatus: {
    options: {
      'self-sustaining': 'Self-sustaining',
      'non-self-sustaining': 'Non self-sustaining'
    }
  },
  ga: {
    options: {
      'no-ga': 'GA animals not used',
      'ga-not-harmful': {
        label: 'GA animals, no harmful phenotype'
      },
      'ga-harmful': {
        label: 'GA animals, harmful phenotype'
      }
    }
  },
  purposes: {
    options: {
      regulatory: {
        label: 'Regulatory & routine production'
      },
      translational: {
        label: 'Translational & applied research'
      },
      breeding: {
        label: 'Breeding & maintenance of GA animals'
      },
      protection: {
        label: 'Protection of natural environment'
      },
      training: {
        label: 'Training'
      },
      forensic: {
        label: 'Forensic enquiries'
      }
    }
  },
  basicSubpurposes: {
    options: {
      cardio: {
        label: 'Cardiovascular/lymphatic system'
      }
    }
  },
  translationalSubpurposes: {
    options: {
      'animal-diseases': 'Animal diseases/disorders'
    }
  },
  regulatorySubpurposes: {
    options: {
      'routine-blood': 'Production: Blood products',
      'routine-monoclonal': 'Production: Monoclonal antibodies',
      'routine-other': 'Other production',
      'qc-batch-potency': 'Batch potency testing',
      'qc-batch-safety': 'Batch safety testing',
      'qc-pyrogenicity': 'Pyrogenicity testing',
      'qc-other': 'Other quality control',
      'other-efficacy': 'Other efficacy/tolerance testing:',
      'toxicity-ld50': 'Acute/sub-acute toxicity: LD50, LC50',
      'toxicity-non-lethal': 'Acute/sub-acute toxicity: Non lethal method',
      'other-toxicity-lethal': 'Acute/sub-acute toxicity: Other lethal method:',
      'toxicity-skin': 'Toxicity & skin irritation',
      'toxicity-skin-sensation': 'Toxicity & skin sensation',
      'toxicity-eye-irritation': 'Toxicity & eye irritation',
      'toxicity-repeated-lt-29': 'Repeated dose toxicity: Up to 29 days',
      'toxicity-repeated-29-90': 'Repeated dose toxicity: 29 to 90 days',
      'toxicity-repeated-mt-90': 'Repeated dose toxicity: > 90 days',
      'toxicity-carcinogenicity': 'Toxicity & carcinogenicity',
      'toxicity-genotoxicity': 'Toxicity & genotoxicity',
      'toxicity-reproductive': 'Toxicity & reproductive toxicity',
      'toxicity-developmental': 'Toxicity & developmental toxicity',
      'toxicity-neurotoxicity': 'Toxicity & neurotoxicity',
      'toxicity-kinetics': 'Toxicity & kinetics',
      'toxicity-pharmaco-dynamics': 'Toxicity & pharmaco-dynamics',
      'toxicity-phototoxicity': 'Toxicity & phototoxicity',
      'toxicity-ecotoxicity-acute': 'Acute toxicity & ecotoxicity',
      'toxicity-ecotoxicity-chronic': 'Chronic toxicity & ecotoxicity',
      'toxicity-ecotoxicity-reproductive': 'Reproductive toxicity & ecotoxicity',
      'toxicity-ecotoxicity-endochronic': 'Toxicity & ecotoxicity: Endochronic activity',
      'toxicity-ecotoxicity-bioaccumulation': 'Toxicity & ecotoxicity: Bioaccumulation',
      'other-toxicity-ecotoxicity': 'Other toxicity & ecotoxicity',
      'toxicity-safety-testing': 'Toxicity & food/feed safety testing',
      'toxicity-target-animal': 'Toxicity & target animal safety',
      'other-toxicity': 'Toxicity & other',
      'combined-end-points': 'Combined end-points'
    }
  },
  regulatoryLegislation: {
    options: {
      biocides: 'Biocides',
      cosmetics: 'Cosmetics',
      feed: 'Feed',
      food: 'Food',
      'industrial-chemicals': 'Industrial chemicals',
      'human-use': 'Medicinal products: humans',
      'veterinary-use': 'Medicinal products: veterinary',
      'medical-devices': 'Medical devices',
      'plant-protection': 'Plant protection productsn'
    }
  },
  regulatoryLegislationOrigin: {
    options: {
      uk: 'UK',
      eu: 'EU',
      'non-eu': 'Outside UK/EU'
    }
  },
  productTestingTypes: {
    options: {
      antibodies: 'Monoclonal antibody harvesting'
    }
  }
});

const content = {
  noDataWarning: '*No procedures added{{#nilReturn}} - nil return{{/nilReturn}}*'
};

module.exports = merge({}, baseContent, { condensedFields }, content);
