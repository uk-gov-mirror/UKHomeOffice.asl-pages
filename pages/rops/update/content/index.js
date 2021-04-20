module.exports = {
  title: 'Return details',
  playback: 'This project\'s licence:',
  fields: {
    proceduresCompleted: {
      label: 'Were any procedures carried out and completed on any animals in {{year}}?',
      hint: 'Include regulated procedures only.',
      options: {
        true: 'Yes, procedures were completed in {{year}}',
        false: 'No, there were no completed procedures in {{year}}'
      }
    },
    postnatal: {
      label: 'Were postnatal or free feeding animals used in {{year}}?',
      hint: 'This includes all mammals already born, birds and reptiles already hatched, and fish, cephalopod and amphibian larvae capable of free feeding.',
      summary: 'When to count larvae as free feeding',
      details: `Zebra fish kept under conventional conditions should be counted as free feeding from five days post-fertilisation.

Medaka should be counted from when they hatch.

Octopus and squid should be counted as free feeding from when they hatch, and cuttlefish from around seven days post-hatching.`,
      options: {
        true: 'Yes, postnatal or free feeding animals were used',
        false: 'No, only animals at an earlier stage of development were used'
      }
    },
    endangered: {
      label: 'Were any endangered species used in procedures in 2021?',
      summary: 'Show list of endangered species',
      details: 'The list of endangered species can be found in [Annex A to Council Regulation EC 338/97](). Captive bred animals of these species do not count as endangered.',
      options: {
        false: 'No, endangered species were not used',
        true: 'Yes, endangered species were used'
      },
      playback: {
        true: 'Includes the use of endangered species',
        false: 'Does not include the use of endangered species'
      }
    },
    endangeredDetails: {
      label: 'Details of endangered animals used'
    },
    nmbas: {
      label: 'Were neuromuscular blocking agents (NMBA) used in any procedures in the reported year?',
      options: {
        false: 'No, NMBAs were not used',
        true: 'Yes, NMBAs were used'
      }
    },
    generalAnaesthesia: {
      label: 'Was general anaesthesia used throughout the entire period of neuromuscular blockade?',
      options: {
        true: 'Yes',
        false: 'No'
      }
    },
    generalAnaesthesiaDetails: {
      label: 'Reason general anaesthesia not used for entire period of neuromuscular blockade'
    },
    rodenticide: {
      label: 'Were any rodenticide trials carried out in 2021?',
      options: {
        false: 'No, rodenticide trials were not carried out',
        true: 'Yes, rodenticide trials were carried out'
      }
    },
    rodenticideDetails: {
      label: 'Details of rodenticide trials carried out'
    },
    productTesting: {
      label: 'Were any of the following techniques used in 2021?',
      options: {
        false: 'No, none of these techniques were used',
        true: 'Yes, one or more of these techniques were used'
      }
    },
    otherSpecies: {
      label: 'Were any other animal types used in procedures in 2021?',
      options: {
        false: 'No, other animal types were not used',
        true: 'Yes, other animal types were used'
      }
    },
    species: {
      label: 'Select {{#hasSpecies}}any other {{/hasSpecies}}animal types used',
      playback: 'Includes the following animal types:'
    },
    reuse: {
      label: 'Did any of the procedures reuse animals in 2021?',
      playback: {
        true: 'Includes the reuse of animals',
        false: 'Does not include reuse of animals'
      },
      options: {
        false: 'No, animals were not reused',
        true: 'Yes, animals were reused'
      },
      summary: 'Guidance on reuse of animals',
      details: 'Re-use is when animals are used again for a new experiment when you could equally use a naïve animal to get the same results. It is not the same as using animals in several protocols in order to achieve your scientific aims. Animals can be reused from one year to the next, so animals reused in 2021 could have first been used in 2020 or earlier.'
    },
    placesOfBirth: {
      label: 'What was the place of birth for animals used in procedures in {{year}}?',
      hint: `For eggs this is where they hatched.{{#reuse}} You do not need to include place of birth for animals reused.{{/reuse}}

Select all that apply`,
      options: {
        'uk-licenced': {
          label: 'In the UK at a licensed establishment',
          hint: 'Including your own establishment'
        },
        'eu-registered': 'In the EU (non-UK) at a registered breeder',
        'uk-non-licenced': {
          label: 'In the UK **not** at a licensed establishment',
          hint: 'For example, cattle sourced at a commercial farm or wild caught animals'
        },
        'eu-non-registered': 'In the EU (non-UK) **not** at a registered breeder',
        'europe': 'In the rest of Europe',
        'rest-of-world': 'In the rest of the world'
      }
    },
    scheduleTwoDetails: {
      label: 'Details of non-purpose bred Schedule 2 species used',
      hint: 'If not applicable, leave blank',
      intro: 'Confirm if any of the animals were Schedule 2 species and if you had prior authority to use non-purpose bred animals.',
      summary: 'Show list of Schedule 2 species',
      details: `* mice
* rats
* guinea pigs
* hamsters
* gerbils
* rabbits
* cats
* dogs
* ferrets
* common quail
* Xenopus Laevis
* Xenopus Tropicalis
* Rana Temporaria
* Rana Pipiens
* Zebrafish
* genetically modified pigs
* genetically modified sheep`
    },
    nhpsOrigin: {
      label: 'Select non-human primate (NHP) place of birth',
      options: {
        'uk-licenced': 'Animals born in UK at a licensed establishment',
        'eu-licenced': 'Animals born in EU (non-UK) at a licensed establishment',
        'uk-non-licenced': 'Animals born in UK but **NOT** at a licensed establishment',
        'eu-non-licenced': 'Animals born in EU (non-UK) but **NOT** at a licensed establishment',
        'europe': 'Animals born in the rest of Europe',
        'asia': 'Animals born in Asia',
        'america': 'Animals born in America',
        'africa': 'Animals born in Africa',
        'elsewhere': 'Animals born elsewhere'
      }
    },
    nhpsColonyStatus: {
      label: 'Non-human primate (NHP) source colony details',
      options: {
        'self-sustaining': 'Self-sustaining colony',
        'non-self-sustaining': 'Non self-sustaining colony'
      }
    },
    nhpsGeneration: {
      label: 'Non-human primate (NHP) generation',
      options: {
        f0: 'F0',
        f1: 'F1',
        f2: 'F2 or greater'
      }
    },
    ga: {
      label: 'Were any genetically altered animals used in procedures in {{year}}',
      options: {
        true: 'Yes, genetically altered animals were used',
        false: 'No, genetically altered animals were not used'
      },
      summary: 'Definitions of genetically altered (GA) animals',
      details: `GA animals are all genetically modified animals (transgenic, knock-out and other forms of genetic alteration) and mutations, whether naturally occurring or induced.

They do not include:

* all wild-type animals, including inbred strains
* genetically normal parents of GA offspring
* genetically normal offspring of GA parents genotyped by non-regulated methods, for example ear notching of mice simultaneously for identification
* triploid fish, unless induction of triploidy is for a scientific purpose
* animals with somatic genetic modification, such as by injection of viral vectors into tissues`,
      playback: {
        true: 'Includes the use of genetically altered animals',
        false: 'Does not include the use of genetically altered animals'
      }
    },
    purposes: {
      label: 'Which purposes best apply to procedures completed in {{year}}?',
      hint: 'Select all that apply',
      options: {
        basic: {
          label: 'Basic research',
          hint: 'For studies of a fundamental nature, including physiology'
        },
        regulatory: {
          label: 'Regulatory use and routine production',
          hint: 'For studies used to secure regulatory approval for new products or substances'
        },
        translational: {
          label: 'Translational and applied research',
          hint: 'For practical applications of research and discovery toxicology'
        },
        breeding: {
          label: 'Breeding and maintenance of colonies for established genetically altered animals, not used in other procedures',
          hint: 'For breeding and maintaining stocks of GA animals'
        },
        protection: {
          label: 'Protection of the natural environment in the interests of the health or welfare of human beings or animals',
          hint: 'For studies into environmental pollution or loss of biodiversity, for example'
        },
        preservation: {
          label: 'Preservation of species',
          hint: 'For studies where the main goal is preservation of a species'
        },
        education: {
          label: 'Higher education',
          hint: 'For educational courses delivered in universities and colleges, for example'
        },
        training: {
          label: 'Training for the acquisition, maintenance or improvement of vocational skills',
          hint: 'For training courses in microsurgery and other skills'
        },
        forensic: {
          label: 'Forensic enquiries',
          hint: 'For forensic testing or the production of materials for forensic investigations'
        }
      }
    },
    basicSubpurposes: {
      label: 'Which of the following sub-purposes apply?',
      hint: 'Select all that apply',
      options: {
        cardio: {
          label: 'Cardiovascular and lymphatic system',
          hint: 'Including blood'
        },
        dentistry: 'Dentistry',
        endocrine: {
          label: 'Endocrine system',
          hint: 'Including metabolism'
        },
        ethology: {
          label: 'Ethology',
          hint: 'Including anmial behaviour and biology'
        },
        gastro: {
          label: 'Gastrointestinal system',
          hint: 'Including the liver'
        },
        immune: 'Immune system',
        multisystemic: 'Multisystemic',
        musculoskeletal: 'Musculoskeletal system',
        nervous: {
          label: 'Nervous system',
          hint: 'Including neuroscience and psychology'
        },
        oncology: 'Oncology',
        respiratory: {
          label: 'Respiratory system',
          hint: 'Including the nose'
        },
        sensory: {
          label: 'Sensory organs',
          hint: 'Including skin, eyes and ears'
        },
        urogenital: {
          label: 'Urogenital system',
          hint: 'Including the reproductive system'
        },
        other: 'Other'
      }
    },
    basicSubpurposesOther: {
      label: 'Specify other research area'
    },
    regulatorySubpurposes: {
      label: 'Which of the following sub-purposes apply?',
      hint: 'Select all that apply',
      options: {
        'qc-batch-potency': 'Quality control: Batch potency testing',
        'qc-batch-safety': 'Quality control: Batch safety testing',
        'qc-pyrogenicity': 'Quality control: Pyrogenicity testing',
        'qc-other': 'Quality control: Other quality controls',
        'routine-blood': 'Routine production: Blood based products',
        'routine-monoclonal': 'Routine production: Monoclonal antibodies',
        'routine-other': 'Routine production: Other',
        'toxicity-ld50': 'Toxicity and acute and sub-acute: LD50, LC50',
        'toxicity-other-lethal': 'Toxicity and acute and sub-acute: Other lethal methods',
        'toxicity-non-lethal': 'Toxicity and acute and sub-acute: Non lethal methods',
        'toxicity-skin': 'Toxicity and skin irritation/corrosion',
        'other-efficacy': 'Other efficacy and tolerance testing'
      }
    },
    regulatorySubpurposesOther: {
      label: 'Specify other'
    },
    regulatoryLegislation: {
      label: 'What type of legislation applies to regulatory research carried out?',
      hint: 'Select all that apply',
      options: {
        biocides: 'Biocides legislation',
        cosmetics: 'Cosmetics legislation',
        feed: 'Feed legislation including legislation for the safety of target animals, workers and environment',
        food: 'Food legislation including food contact material',
        'industrial-chemicals': 'Industrial chemicals legislation',
        'human-use': 'Legislation on medicinal products for human use',
        'veterinary-use': 'Legislation on medicinal products for veterinary use and their residues',
        'medical-devices': 'Medical devices legislation',
        'plant-protection': 'Plant protection product legislation',
        other: 'Other'
      }
    },
    regulatoryLegislationOther: {
      label: 'Specify other'
    },
    regulatoryLegislationOrigin: {
      label: 'What’s the origin of the legislation?',
      hint: 'Select all that apply',
      options: {
        uk: 'Legislation satisfying UK requirements only',
        eu: 'Legislation satisfying EU requirements',
        'non-eu': 'Legislation satisfying Non-EU requirements'
      }
    },
    translationalSubpurposes: {
      label: 'Which sub-purpose best describes the research area?',
      hint: 'Select all that apply',
      options: {
        cancer: 'Human cancer',
        cardio: 'Human cardiovascular disorders',
        dentistry: 'Human dentistry',
        endocrine: {
          label: 'Human endocrine disorders',
          hint: 'Including metabolic disorders'
        },
        gastro: {
          label: 'Human gastrointestinal disorders',
          hint: 'Including liver disease'
        },
        immune: 'Human immune disorders',
        infectious: 'Human infectious disorders',
        musculoskeletal: 'Human musculoskeletal disorders',
        nervous: 'Human nervous and mental disorders',
        respiratory: {
          label: 'Human respiratory disorders',
          hint: 'Including Covid-19'
        },
        sensory: {
          label: 'Human sensory organ disorders',
          hint: 'Including skin, eyes and ears'
        },
        urogenital: {
          label: 'Human urogenital disorders',
          hint: 'Including reproductive disorders'
        },
        other: 'Other human disorders',
        'animal-diseases': 'Animal diseases and disorders',
        'animal-nutrition': 'Animal nutrition',
        'animal-welfare': 'Animal welfare',
        diagnosis: 'Diagnosis of diseases',
        'non-reg-tox': {
          label: 'Non-regulatory toxicology',
          hint: 'Including ecotoxicology'
        },
        plant: 'Plant diseases'
      }
    },
    translationalSubpurposesOther: {
      label: 'Specify other human disorder'
    },
    newGeneticLine: {
      label: 'Did any procedures involve the creation of a new genetic line?',
      summary: 'Guidance on creating genetic lines',
      details: `You should include all animals involved in the creation of a new genetic line up to the point the genetic line is considered established. Offspring from crossing established lines of genetically altered animals are considered to be a new line.

Crossing a genetically altered animal with a wild type animal will not normally be considered to create a new line unless it’s expected to adversely affect the phenotype.`,
      options: {
        true: 'Yes, new genetic lines were created',
        false: 'No, new genetic lines were not created'
      }
    },
    productTestingTypes: {
      label: 'Which of the following techniques were used in {{year}}',
      hint: 'Select all that apply',
      options: {
        household: 'Household product testing',
        tobacco: 'Tobacco product testing',
        alcohol: 'Alcohol product testing',
        antibodies: 'Harvesting monoclonal antibodies from ascites fluid'
      },
      hints: {
        tobacco: 'This does not include testing compounds found in tobacco or the effects of tobacco in disease models',
        alcohol: 'This does not include testing ethanol or the effects of alcohol in disease models',
        antibodies: 'This does not include animals immunised to provide tissues to generate monoclonal antibodies in vitro'
      }
    }
  },
  buttons: {
    submit: 'Continue'
  },
  steps: {
    setup: {
      title: 'Set up return',
      content: 'Answer a few questions to pre-fill procedures with information relevant to this project.'
    },
    schedule2: {
      'animals-born': 'For animals born:'
    },
    confirm: {
      title: 'Check setup details',
      buttons: {
        submit: 'Continue to procedures'
      }
    }
  },
  errors: {
    species: {
      customValidate: 'This is a required field'
    },
    otherSpecies: {
      customValidate: 'At least one animal type must be provided.'
    }
  },
  sections: {
    details: {
      title: 'Return details'
    },
    general: {
      title: 'Set up return: general'
    },
    animals: {
      title: 'Set up return: animals'
    },
    purposes: {
      title: 'Set up return: purposes',
      purpose: {
        title: 'For the purpose',
        subpurpose: 'For the sub-purposes'
      }
    },
    techniques: {
      title: 'Set up return: techniques'
    }
  }
};
