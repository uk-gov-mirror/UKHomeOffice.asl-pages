module.exports = {
  overview: {
    title: 'Overview',
    fields: [
      {
        name: 'duration',
        label: 'Project duration',
        type: 'Duration'
      },
      {
        name: 'permissible-purpose',
        label: 'Project purpose',
        type: 'Purpose'
      },
      {
        name: 'keywords',
        label: 'Key words',
        type: 'Keywords'
      },
      {
        name: 'species',
        label: 'Animal types and life stages',
        type: 'SpeciesTable'
      },
      {
        heading: 'Retrospective assessment',
        type: 'RetrospectiveDecision'
      }
    ]
  },
  objectives: {
    title: 'Objectives and benefits',
    subtitle: `Description of the projects objectives, for example the scientific unknowns or clinical or scientific needs
it's addressing.`,
    fields: [
      {
        name: 'project-aim',
        label: 'What\'s the aim of this project?',
        raSummary: [
          'continue-on-other-licence',
          'aims-achieved'
        ]
      },
      {
        type: 'RetrospectivePlaceholder',
        content: `### A retrospective assessment of these aims will be due {{#hasRaDate}}by {{raDate}}{{/hasRaDate}}{{^hasRaDate}}within 6 months of the licence's revocation date{{/hasRaDate}}
The PPL holder will be required to disclose:
* Is there a plan for this work to continue under another licence?
* Did the project achieve its aims and if not, why not?`
      },
      {
        heading: `Potential benefits likely to derive from the project, for example how science might be advanced or how humans,
animals or the environment might benefit - these could be short-term benefits within the duration of the project
or long-term benefits that accrue after the project has finished.`
      },
      {
        name: 'project-importance',
        label: 'Why is it important to undertake this work?'
      },
      {
        name: 'benefit-outputs',
        label: 'What outputs do you think you will see at the end of this project?',
        training: false
      },
      {
        name: 'benefit-who',
        label: `Who or what will benefit from these outputs, and how?`,
        training: false
      },
      {
        name: 'training-benefit-future-careers',
        label: 'How will course attendees use their knowledge or skills in their future careers?',
        training: true
      },
      {
        name: 'training-benefit-principle-learning-outcomes',
        label: 'What are the principal learning outcomes from the course?',
        training: true
      },
      {
        name: 'training-benefit-learning-outcomes-important',
        label: 'How are these learning outcomes important to the people on the course?',
        training: true
      },
      {
        name: 'training-benefit-transfer-of-knowledge',
        label: 'Who or what will benefit from the transfer of knowledge, or acquisition of skills that this course will deliver?',
        training: true
      },
      {
        name: 'benefit-maximise-outputs',
        label: 'How will you look to maximise the outputs of this work?'
      },
      {
        name: 'species-count',
        label: 'Species and numbers of animals expected to be used',
        type: 'SpeciesCount'
      }
    ]
  },
  harms: {
    title: 'Predicted harms',
    subtitle: `Typical procedures done to animals, for example injections or surgical procedures, including duration of the
experiment and number of procedures.`,
    fields: [
      {
        name: 'project-harms-animals',
        label: 'Explain why you are using these types of animals and your choice of life stages.'
      },
      {
        name: 'project-harms-summary',
        label: `Typically, what will be done to an animal used in your project?`
      },
      {
        name: 'project-harms-effects',
        label: `What are the expected impacts and/or adverse effects for the animals during your project?`
      },
      {
        heading: 'Expected severity categories and the proportion of animals in each category, per species.'
      },
      {
        name: 'project-harms-severity',
        label: 'What are the expected severities and the proportion of animals in each category (per animal type)?'
      },
      {
        name: 'fate-of-animals',
        label: 'What will happen to animals at the end of this project?',
        type: 'FateOfAnimals',
        raSummary: [
          'actual-harms'
        ]
      },
      {
        type: 'RetrospectivePlaceholder',
        content: `### A retrospective assessment of these predicted harms will be due {{#hasRaDate}}by {{raDate}}{{/hasRaDate}}{{^hasRaDate}}within 6 months of the licence's revocation date{{/hasRaDate}}
The PPL holder will be required to disclose:
  * What harms were caused to the animals, how severe were those harms and how many animals were affected?`
      }
    ]
  },
  replacement: {
    title: 'Replacement',
    subtitle: `State what non-animal alternatives are available in this field, which alternatives you have considered
and why they cannot be used for this purpose.`,
    fields: [
      {
        name: 'replacement-why',
        label: 'Why do you need to use animals to achieve the aim of your project?'
      },
      {
        name: 'replacement-alternatives',
        label: 'Which non-animal alternatives did you consider for use in this project?',
        training: false
      },
      {
        name: 'replacement-justification',
        label: 'Why were they not suitable?',
        training: false,
        raSummary: ['replacement']
      },
      {
        name: 'training-replacement-observation',
        label: 'Why can’t your aim be met by observing or by participating in ongoing research or clinical procedures?',
        training: true,
        raSummary: ['replacement']
      },
      {
        type: 'RetrospectivePlaceholder',
        content: `### A retrospective assessment of replacement will be due {{#hasRaDate}}by {{raDate}}{{/hasRaDate}}{{^hasRaDate}}within 6 months of the licence's revocation date{{/hasRaDate}}
The PPL holder will be required to disclose:
  * What, if any, non-animal alternatives were used or explored after the project started, and is there anything others
  can learn from your experience?`
      }
    ]
  },
  reduction: {
    title: 'Reduction',
    subtitle: `Explain how the numbers of animals for this project were determined. Describe steps that have been taken
to reduce animal numbers, and principles used to design studies. Describe practices that are used throughout the
project to minimise numbers consistent with scientific objectives, if any. These may include e.g. pilot studies,
computer modelling, sharing of tissue and reuse.`,
    fields: [
      {
        name: 'reduction-estimation',
        label: 'How have you estimated the numbers of animals you will use?'
      },
      {
        name: 'reduction-steps',
        label: `What steps did you take during the experimental design phase to reduce the number of animals being used
in this project?`,
        training: false
      },
      {
        name: 'reduction-review',
        label: `What measures, apart from good experimental design, will you use to optimise the number of animals you
plan to use in your project?`,
        training: false,
        raSummary: ['reduction']
      },
      {
        name: 'training-reduction-techniques',
        label: 'What in silico or ex vivo techniques will you use during training?',
        training: true
      },
      {
        name: 'training-reduction-animal-numbers',
        label: 'Will these techniques reduce animal numbers? If so, how?',
        training: true
      },
      {
        name: 'training-reduction-other-measures',
        label: 'What other measures will you use to minimise the number of animals you plan to use in your project?',
        training: true,
        raSummary: ['reduction']
      },
      {
        type: 'RetrospectivePlaceholder',
        content: `### A retrospective assessment of reduction will be due {{#hasRaDate}}by {{raDate}}{{/hasRaDate}}{{^hasRaDate}}within 6 months of the licence's revocation date{{/hasRaDate}}
The PPL holder will be required to disclose:
* How did you minimise the numbers of animals used on your project and is there anything others can learn from your experience?`
      }
    ]
  },
  refinement: {
    title: 'Refinement',
    subtitle: `Give examples of the specific measures (e.g., increased monitoring, post-operative care, pain management,
training of animals) to be taken, in relation to the procedures, to minimise welfare costs (harms) to the animals.
Describe the mechanisms in place to take up emerging refinement techniques during the lifetime of the project.`,
    fields: [
      {
        name: 'refinement-models',
        label: `Which animal models and methods will you use during this project?
Explain why these models and methods cause the least pain, suffering, distress, or lasting harm to the animals.`
      },
      {
        name: 'refinement-less-sentient',
        label: `Why can’t you use animals that are less sentient?`
      },
      {
        name: 'refinement-explaination',
        label: `How will you refine the procedures you're using to minimise the welfare costs (harms) for the animals?`
      },
      {
        name: 'refinement-published-guidance',
        label: 'What published best practice guidance will you follow to ensure experiments are conducted in the most refined way?'
      },
      {
        name: 'refinement-3rs-advances',
        label: 'How will you stay informed about advances in the 3Rs, and implement these advances effectively, during the project?',
        raSummary: ['refinement']
      },
      {
        type: 'RetrospectivePlaceholder',
        content: `### A retrospective assessment of refinement will be due {{#hasRaDate}}by {{raDate}}{{/hasRaDate}}{{^hasRaDate}}within 6 months of the licence's revocation date{{/hasRaDate}}
The PPL holder will be required to disclose:
* With the knowledge you have now, could the choice of animals or model(s) used be improved for future work of this kind?
  During the project, how did you minimise harm to the animals?`
      }
    ]
  }
};
