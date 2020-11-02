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
        label: 'What is the aim of this project?'
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
        heading: `In the context of what you propose to do to the animals, what are the expected adverse effects and the
        likely/expected level of severity? What will happen to the animals at the end?`
      }
    ]
  },
  replacement: {
    title: 'Replacement',
    fields: [
      {
        name: 'nts-replacement',
        heading: `State why you need to use animals and why you cannot use non-animal alternatives.`
      }
    ]
  },
  reduction: {
    title: 'Reduction',
    fields: [
      {
        name: 'nts-reduction',
        heading: `Explain how you will assure the use of minimum numbers of animals.`
      }
    ]
  },
  refinement: {
    title: 'Refinement',
    fields: [
      {
        name: 'nts-refinement',
        heading: `Explain the choice of species and why the animal model(s) you will use are the most refined, having
        regard to the objectives. Explain the general measures you will take to minimise welfare costs (harms) to the animals.`
      }
    ]
  }
};
