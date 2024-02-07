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
        heading: 'Retrospective assessment',
        type: 'RetrospectiveDecision'
      }
    ]
  },
  objectives: {
    title: 'Objectives and benefits',
    subtitle: `Description of the project’s objectives, for example the scientific unknowns or clinical or scientific
needs it’s addressing.`,
    fields: [
      {
        name: 'nts-objectives',
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
        name: 'nts-benefits',
        label: 'What are the potential benefits that will derive from this project?'
      },
      {
        heading: `Species and numbers of animals expected to be used`
      },
      {
        name: 'nts-numbers',
        label: 'What types and approximate numbers of animals will you use over the course of this project?',
        training: false
      }
    ]
  },
  harms: {
    title: 'Predicted harms',
    subtitle: `Typical procedures done to animals, for example injections or surgical procedures, including duration of the
experiment and number of procedures.`,
    fields: [
      {
        name: 'nts-adverse-effects',
        label: `In the context of what you propose to do to the animals, what are the expected adverse effects and the
likely/expected level of severity? What will happen to the animals at the end?`,
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
    fields: [
      {
        name: 'nts-replacement',
        label: `State why you need to use animals and why you cannot use non-animal alternatives.`,
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
    fields: [
      {
        name: 'nts-reduction',
        label: `Explain how you will assure the use of minimum numbers of animals.`,
        raSummary: ['reduction']
      },
      {
        type: 'RetrospectivePlaceholder',
        content: `### A retrospective assessment of reduction will be due by {{#hasRaDate}}by {{raDate}}{{/hasRaDate}}{{^hasRaDate}}within 6 months of the licence's revocation date{{/hasRaDate}}
The PPL holder will be required to disclose:
  * How did you minimise the numbers of animals used on your project and is there anything others can learn from your experience?`
      }
    ]
  },
  refinement: {
    title: 'Refinement',
    fields: [
      {
        name: 'nts-refinement',
        label: `Explain the choice of species and why the animal model(s) you will use are the most refined, having
regard to the objectives. Explain the general measures you will take to minimise welfare costs (harms) to the animals.`,
        raSummary: ['refinement']
      },
      {
        type: 'RetrospectivePlaceholder',
        content: `### A retrospective assessment of refinement will be due by {{#hasRaDate}}by {{raDate}}{{/hasRaDate}}{{^hasRaDate}}within 6 months of the licence's revocation date{{/hasRaDate}}
The PPL holder will be required to disclose:
* With the knowledge you have now, could the choice of animals or model(s) used be improved for future work of this kind?
  During the project, how did you minimise harm to the animals?`
      }
    ]
  }
};
