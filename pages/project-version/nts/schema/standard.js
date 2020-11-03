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
        name: 'retrospective-assessment',
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
        label: 'What is the aim of this project?'
      },
      {
        name: 'retro-aims',
        type: 'RetrospectivePlaceholder',
        content: `### A retrospective assessment of these aims will be due by {{raDate}}
The PPL holder will be required to disclose:
  * Is there a plan for this work to continue under another licence?
  * Did the project achieve it's aims and if not, why not?`
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
        label: `What will be the impact of this proposed work on humans / animals / the environment in the short-term
        (within the duration of the project), in the medium-term and the long-term (which may accrue after the project
        is finished)?`,
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
        label: 'How will you maximise the outputs of your work?'
      },
      {
        name: 'species-count',
        label: 'Species and numbers of animals expected to be used'
      }
    ]
  },
  harms: {
    title: 'Predicted harms',
    subtitle: `Typical procedures done to animals, for example injections or surgical procedures, including duration of the
    experiment and number of procedures.`,
    fields: [
      {
        name: 'project-harms-summary',
        heading: `Describe, in general terms, the procedures animals will undergo, eg injections, surgical procedures.
        Include the typical number of procedures individual animals will undergo and the likely duration of suffering.`
      },
      {
        name: 'project-harms-effects',
        label: `Expected impacts or adverse effects on the animals - for example, pain, weight loss, inactivity or lameness,
        stress, or abnormal behaviour - and how long those effects are expected to last.`
      },
      {
        heading: 'Expected severity categories and the proportion of animals in each category, per species.'
      },
      {
        name: 'project-harms-severity',
        label: 'What are the expected severities and the proportion of animals in each category (per species)?'
      },
      {
        name: 'fate-of-animals',
        label: 'What will happen to the animals at the end of the study?'
      },
      {
        name: 'retro-harms',
        type: 'RetrospectivePlaceholder',
        content: `### A retrospective assessment of these predicted harms will be due by {{raDate}}
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
        heading: 'Why do you need to use animals to achieve the aim of your project?'
      },
      {
        name: 'replacement-alternatives',
        label: 'What was your strategy for searching for non-animal alternatives?',
        training: false
      },
      {
        name: 'replacement-justification',
        label: 'Why were they not suitable?',
        training: false
      },
      {
        name: 'training-replacement-observation',
        label: 'Why can’t your aim be met by observing or by participating in ongoing research or clinical procedures?',
        training: true
      },
      {
        name: 'retro-replacement',
        type: 'RetrospectivePlaceholder',
        content: `### A retrospective assessment of replacement will be due by {{raDate}}
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
        label: `What steps will you take to reduce animal numbers? Where applicable, what principles will you use to
        design experiments?`,
        training: false
      },
      {
        name: 'reduction-review',
        label: 'What other measures apart from good experimental design will you use to minimise numbers?',
        training: false
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
        training: true
      },
      {
        name: 'retro-reduction',
        type: 'RetrospectivePlaceholder',
        content: `### A retrospective assessment of reduction will be due by {{raDate}}
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
        label: `Why are the animals, models and methods you will use the best to meet your objectives? Why will your
        approach cause the least pain, suffering, distress or lasting harm?`
      },
      {
        name: 'refinement-less-sentient',
        label: `Why can’t you use a less sentient animal, (for example at an immature stage, a less sentient species or
        using terminally anaesthetised animals)?`
      },
      {
        name: 'refinement-explaination',
        label: `What are you going to do to refine the procedures (for example increased monitoring, post-operative
        care, pain management, training of animals) to minimise the welfare costs (harms) to the animals?`
      },
      {
        name: 'refinement-published-guidance',
        label: 'What published best practice guidance will be followed to ensure experiments are conducted in most refined way?'
      },
      {
        name: 'refinement-3rs-advances',
        label: 'How will you ensure you continue to use the most refined methods during the lifetime of this project?'
      },
      {
        name: 'project-harms-animals',
        label: 'Explain the choice of species and the related life stages'
      },
      {
        name: 'retro-refinement',
        type: 'RetrospectivePlaceholder',
        content: `### A retrospective assessment of refinement will be due by {{raDate}}
The PPL holder will be required to disclose:
  * With the knowledge you have now, could the choice of animals or model(s) used be improved for future work of this kind?
  During the project, how did you minimise harm to the animals?`
      }
    ]
  }
};
