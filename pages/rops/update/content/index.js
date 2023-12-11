module.exports = {
  ropHeader: {
    title: 'Return of procedures {{year}}'
  },
  title: 'Return details',
  subtitle: 'Section {{section}} of 4',
  playback: 'This licence:',
  guidance: {
    title: 'Detailed guidance',
    hint: 'Link opens in a new tab',
    link: 'Guidance on completing {{year}} annual return of procedures'
  },
  fields: {
    disabledWarning: 'This item has already been cited in one or more procedures and cannot be removed',
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
      label: 'Were any endangered species used in procedures in {{year}}?',
      summary: 'Where to find the endangered species list',
      details: 'The list of endangered species can be found in [Annex A to Council Regulation EC 338/97](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32014R1320). Captive bred animals of these species do not count as endangered.',
      options: {
        false: 'No, endangered species were not used',
        true: 'Yes, endangered species were used'
      },
      playback: {
        true: 'Authorises or previously authorised use of endangered species',
        false: 'Does not authorise use of endangered species'
      }
    },
    endangeredDetails: {
      label: 'Details of endangered animals used'
    },
    nmbas: {
      label: 'Were neuromuscular blocking agents (NMBAs) used in any procedures in {{year}}?',
      options: {
        false: 'No, NMBAs were not used',
        true: 'Yes, NMBAs were used'
      },
      playback: {
        true: 'Authorises or previously authorised use of NMBAs',
        false: 'Does not authorise use of NMBAs'
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
      label: 'Were any rodenticide trials carried out in {{year}}?',
      options: {
        false: 'No, rodenticide trials were not carried out',
        true: 'Yes, rodenticide trials were carried out'
      }
    },
    rodenticideDetails: {
      label: 'Details of rodenticide trials carried out'
    },
    productTesting: {
      label: 'Were any of the following techniques used in {{year}}?',
      options: {
        false: 'No, none of these techniques were used',
        true: 'Yes, one or more of these techniques were used'
      }
    },
    otherSpecies: {
      label: 'Were any other animal types used in procedures in {{year}}?',
      options: {
        false: 'No, other animal types were not used',
        true: 'Yes, other animal types were used'
      }
    },
    species: {
      label: 'Select {{#hasSpecies}}any other {{/hasSpecies}}animal types used',
      hint: 'Select all that apply',
      playback: 'This licence authorises or previously authorised use of the following animal types:'
    },
    'species-other-rodents': {
      label: 'Specify other rodents'
    },
    'species-other-amphibians': {
      label: 'Specify other amphibians'
    },
    'species-other-fish': {
      label: 'Specify other fish'
    },
    'species-other-birds': {
      label: 'Specify other birds'
    },
    'species-other-camelids': {
      label: 'Specify camelids'
    },
    'species-other-equidae': {
      label: 'Specify other equidae'
    },
    'species-other-dogs': {
      label: 'Specify other dogs'
    },
    'species-other-nhps': {
      label: 'Specify other non human primates'
    },
    'species-other-carnivores': {
      label: 'Specify other carnivores'
    },
    'species-other-reptiles': {
      label: 'Specify reptiles'
    },
    'species-other-mammals': {
      label: 'Specify other mammals'
    },
    reuse: {
      label: 'Did any of the procedures reuse animals in {{year}}?',
      playback: {
        true: 'authorises or previously authorised reuse of animals',
        false: 'Does not authorise reuse of animals'
      },
      options: {
        false: 'No, animals were not reused',
        true: 'Yes, animals were reused'
      },
      summary: 'Guidance on reuse of animals',
      details: 'Reuse is when animals are used again for a new experiment when you could equally use a naïve animal to get the same results. It is not the same as using animals in several protocols in order to achieve your scientific aims. Animals can be reused from one year to the next, so animals reused in {{year}} could have first been used in {{lastYear}} or earlier.'
    },
    placesOfBirth: {
      label: 'What was the place of birth for animals used in procedures in {{year}}?',
      hint: `For eggs this is where they hatched.{{#reuse}} You do not need to include place of birth for animals reused.{{/reuse}}

Select all that apply`,
      options: {
        'uk-licenced': {
          label: 'In the UK at a licensed establishment',
          hint: 'Including your own'
        },
        'eu-registered': 'In the EU (non-UK) at a registered breeder',
        'uk-non-licenced': {
          label: 'In the UK **not** at a licensed establishment',
          hint: 'For example, cattle sourced at a commercial farm or wild caught animals'
        },
        'eu-non-registered': 'In the EU (non-UK) **not** at a registered breeder',
        'europe': {
          label: 'In the rest of Europe',
          hint: 'These are the Council of Europe countries and Israel'
        },
        'rest-of-world': 'In the rest of the world'
      }
    },
    scheduleTwoDetails: {
      label: 'Details of non-purpose bred Schedule 2 species used',
      hint: 'If not applicable, leave blank',
      intro: 'Confirm if any of the animals were Schedule 2 species and if you had prior authority to use non-purpose bred animals.',
      summary: 'Show list of Schedule 2 species',
      details: `* Mice
* Rats
* Guinea pigs
* Hamsters (Syrian) (Mesocricetus auratus)
* Hamsters (Chinese) (Cricetulus griseus)
* Gerbils
* Rabbits
* Cats
* Dogs
* Ferrets
* Quail (Coturnix coturnix)
* Xenopus Laevis
* Xenopus Tropicalis
* Rana Temporaria
* Rana Pipiens
* Zebrafish (Danio rerio)
* Genetically modified pigs
* Genetically modified sheep`
    },
    nhpsOrigin: {
      label: 'What was the place of birth for non-human primates used in procedures in {{year}}?',
      hint: 'Select all that apply',
      options: {
        'uk-licenced': {
          label: 'In the UK at a licensed establishment',
          hint: 'Including your own'
        },
        'eu-licenced': 'In the EU (non-UK) at a registered breeder',
        'uk-non-licenced': 'In the UK **not** at a licensed establishment',
        'eu-non-licenced': 'In the EU (non UK) **not** at a registered breeder',
        'europe': 'In the rest of Europe',
        'asia': {
          label: 'In Asia',
          hint: 'Including China'
        },
        'america': {
          label: 'In America',
          hint: 'Including North, Central and South America'
        },
        'africa': {
          label: 'In Africa',
          hint: 'Including Mauritius'
        },
        'elsewhere': {
          label: 'In the rest of the world',
          hint: 'Including Australasia'
        }
      }
    },
    nhpsColonyStatus: {
      label: 'Where were they sourced from?',
      hint: 'Select all that apply',
      options: {
        'self-sustaining': 'Self-sustaining colony',
        'non-self-sustaining': 'Non self-sustaining colony'
      },
      summary: 'Definitions of self-sustaining colonies',
      details: `**Marmosets, tamarins and other new world primates**

A self-sustaining colony is a colony that contains no wild caught animals, is kept in a way that ensures animals are used to humans, and is sustained using animals sourced from within or from other self-sustaining colonies.

**Macaques and other old world primates**

A self-sustaining colony is a colony that no longer sources animals from the wild (it may contain some existing wild caught animals) and is sustained using only captive bred animals.`
    },
    nhpsGeneration: {
      label: 'What was their generation (maternal line)?',
      hint: 'Select all that apply',
      options: {
        f0: 'F0 (wild caught)',
        f1: 'F1 (progeny of wild caught females)',
        f2: 'F2 or greater (progeny of captive bred females)'
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
        true: 'Authorises or previously authorised use of genetically altered animals',
        false: 'Does not authorise use of genetically altered animals'
      }
    },
    purposes: {
      label: 'Which purpose or purposes best apply to procedures completed in {{year}}?',
      hint: 'Select all that apply',
      options: {
        basic: {
          label: 'Basic research',
          hint: 'For studies of a fundamental nature, including physiology'
        },
        translational: {
          label: 'Translational and applied research',
          hint: 'For practical applications of research and discovery toxicology'
        },
        protection: {
          label: 'Protection of the natural environment in the interests of the health or welfare of human beings or animals',
          hint: 'For studies into environmental pollution or loss of biodiversity, for example'
        },
        preservation: {
          label: 'Preservation of species',
          hint: 'For studies where the main goal is preservation of a species'
        },
        education_or_training: {
          label: 'Higher education or training courses',
          hint: 'For educational courses delivered by universities and colleges, or vocational training in surgical procedures and other skills'
        },
        forensic: {
          label: 'Forensic enquiries',
          hint: 'For forensic testing or the production of materials for forensic investigations'
        },
        breeding: {
          label: 'Breeding and maintenance of colonies for established genetically altered animals, not used in other procedures',
          hint: 'For breeding and maintaining stocks of GA animals'
        },
        regulatory: {
          label: 'Regulatory use and routine production',
          hint: 'For studies used to secure regulatory approval for new products or substances'
        }
      }
    },
    basicSubpurposes: {
      label: 'Which sub-purpose best describes the research area?',
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
          hint: 'Including animal behaviour and biology'
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
        developmental: 'Developmental biology',
        other: 'Other'
      }
    },
    basicSubpurposesOther: {
      label: 'Specify other research area'
    },
    regulatorySubpurposes: {
      label: 'Which sub-purpose best describes the research area?',
      hint: 'Select all that apply',
      options: {
        'qc-batch-potency': 'Quality control: Batch potency testing',
        'qc-batch-safety': 'Quality control: Batch safety testing',
        'qc-pyrogenicity': 'Quality control: Pyrogenicity testing',
        'qc-other': 'Quality control: Other quality controls',
        'routine-blood': 'Routine production: Blood based products',
        'routine-monoclonal': 'Routine production: Monoclonal antibodies and polyclonal antisera',
        'routine-other': 'Routine production: Other',
        'toxicity-ld50': 'Toxicity and acute and sub-acute: LD50, LC50',
        'other-toxicity-lethal': 'Toxicity and acute and sub-acute: Other lethal methods',
        'toxicity-non-lethal': 'Toxicity and acute and sub-acute: Non lethal methods',
        'toxicity-skin': 'Toxicity and skin irritation/corrosion',
        'other-efficacy': 'Other efficacy and tolerance testing',
        'toxicity-skin-sensation': 'Toxicity and skin sensation',
        'toxicity-eye-irritation': 'Toxicity and eye irritation/corrosion',
        'toxicity-repeated-lt-29': 'Toxicity and repeated dose toxicity: Up to 29 days',
        'toxicity-repeated-29-90': 'Toxicity and repeated dose toxicity: 29 to 90 days',
        'toxicity-repeated-mt-90': 'Toxicity and repeated dose toxicity: More than 90 days',
        'toxicity-carcinogenicity': 'Toxicity and carcinogenicity',
        'toxicity-genotoxicity': 'Toxicity and genotoxicity',
        'toxicity-reproductive': 'Toxicity and reproductive toxicity',
        'toxicity-developmental': 'Toxicity and developmental toxicity',
        'toxicity-neurotoxicity': 'Toxicity and neurotoxicity',
        'toxicity-kinetics': 'Toxicity and kinetics',
        'toxicity-pharmaco-dynamics': 'Toxicity and pharmaco-dynamics (including safety pharmacology)',
        'toxicity-phototoxicity': 'Toxicity and phototoxicity',
        'toxicity-ecotoxicity-acute': 'Toxicity and ecotoxicity: Acute toxicity',
        'toxicity-ecotoxicity-chronic': 'Toxicity and ecotoxicity: Chronic toxicity',
        'toxicity-ecotoxicity-reproductive': 'Toxicity and ecotoxicity: Reproductive toxicity',
        'toxicity-ecotoxicity-endochronic': 'Toxicity and ecotoxicity: Endocrine activity',
        'toxicity-ecotoxicity-bioaccumulation': 'Toxicity and ecotoxicity: Bioaccumulation',
        'other-toxicity-ecotoxicity': 'Toxicity and ecotoxicity: Other',
        'toxicity-safety-testing': 'Toxicity and safety testing in food and feed area',
        'toxicity-target-animal': 'Toxicity and target animal safety',
        'other-toxicity': 'Toxicity and other',
        'combined-end-points': 'Combined end-points'
      }
    },
    regulatorySubpurposesOther: {
      label: 'Specify other routine production'
    },
    regulatorySubpurposesQcOther: {
      label: 'Specify other quality controls'
    },
    regulatorySubpurposesOtherEfficacy: {
      label: 'Specify other efficacy and tolerance testing'
    },
    regulatorySubpurposesOtherToxicity: {
      label: 'Specify other'
    },
    regulatorySubpurposesOtherToxicityEcotoxicity: {
      label: 'Specify other toxicity and ecotoxicity'
    },
    regulatorySubpurposesOtherToxicityLethal: {
      label: 'Specify other lethal methods'
    },
    regulatoryLegislation: {
      label: 'Which of the following types of legislation applies?',
      hint: 'Select all that apply',
      options: {
        biocides: 'Biocides legislation',
        cosmetics: 'Cosmetics legislation',
        feed: 'Feed legislation including legislation for the safety of target animals, workers and the environment',
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
      label: 'Specify other type of legislation'
    },
    regulatoryLegislationOrigin: {
      label: 'What’s the origin of the legislation?',
      hint: 'Select all that apply',
      options: {
        uk: 'Legislation satisfying UK requirements only',
        eu: 'Legislation satisfying EU requirements',
        'non-eu': 'Legislation satisfying non-EU requirements'
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
      title: 'Check set up details',
      buttons: {
        submit: '{{#redirectTo}}Continue return set up{{/redirectTo}}{{^redirectTo}}Continue to procedures{{/redirectTo}}'
      }
    }
  },
  errors: {
    proceduresCompleted: {
      required: 'Select if procedures were completed on animals in {{year}}'
    },
    postnatal: {
      required: 'Select if postnatal or free feeding animals were used in procedures in {{year}}'
    },
    endangered: {
      required: 'Select if endangered species were used in procedures in {{year}}'
    },
    endangeredDetails: {
      required: 'Give details of endangered species used'
    },
    nmbas: {
      required: 'Select if neuromuscular blocking agents were used in procedures in {{year}}'
    },
    generalAnaesthesia: {
      required: 'Select if general anaesthesia was used throughout the entire period of neuromuscular blockade'
    },
    generalAnaesthesiaDetails: {
      required: 'Explain why general anaesthesia was not used throughout the entire period of neuromuscular blockade'
    },
    rodenticide: {
      required: 'Select if rodenticide trials were carried out in {{year}}'
    },
    rodenticideDetails: {
      required: 'Give details of rodenticide trials carried out'
    },
    productTesting: {
      required: 'Select if any of the techniques listed were used in {{year}}'
    },
    productTestingTypes: {
      required: 'Select which techniques were used'
    },
    species: {
      customValidate: 'Select which other animal types were used'
    },
    otherSpecies: {
      required: 'Select if any other animal types were used in procedures in {{year}}',
      customValidate: 'At least one animal type must be provided.'
    },
    reuse: {
      required: 'Select if any procedures reused animals in {{year}}'
    },
    placesOfBirth: {
      required: 'Select the place of birth for animals used in procedures in {{year}}'
    },
    nhpsOrigin: {
      required: 'Select the place of birth for non-human primates used in procedures in {{year}}'
    },
    nhpsColonyStatus: {
      required: 'Select where the non-human primates were sourced from'
    },
    nhpsGeneration: {
      required: 'Select the generation (maternal line) of non-human primates'
    },
    ga: {
      required: 'Select if genetically altered animals were used in procedures in {{year}}'
    },
    purposes: {
      required: 'Select the purposes that best apply to procedures completed in {{year}}'
    },
    basicSubpurposes: {
      required: 'Select the sub-purposes that best describe the research area'
    },
    regulatorySubpurposes: {
      required: 'Select the sub-purposes that best describe the research area'
    },
    regulatoryLegislation: {
      required: 'Select the type of legislation that applies to the regulatory research carried out'
    },
    regulatoryLegislationOrigin: {
      required: 'Select the origin of the legislation'
    },
    translationalSubpurposes: {
      required: 'Select the sub-purposes that best describe the research area'
    },
    newGeneticLine: {
      required: 'Select if procedures involved the creation of a new genetic line'
    }
  },
  sections: {
    details: {
      title: 'Return details'
    },
    animals: {
      title: 'Set up return: animals'
    },
    purposes: {
      title: 'Set up return: purposes',
      purpose: {
        title: 'For the purpose:',
        subpurpose: 'For the sub-purposes:'
      }
    },
    techniques: {
      title: 'Set up return: techniques'
    }
  }
};
