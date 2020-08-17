module.exports = {
  fields: {
    procedures: {
      label: '',
      hint: 'Select each category that you want your licence to cover.'
    },
    notesCatD: {
      label: 'Evidence of competency',
      hint: 'Please provide evidence that you have achieved and maintained anaesthesia in the relevant animal species, and explain how you have witnessed the use of neuromuscular blocking agents during procedures.'
    },
    notesCatF: {
      label: 'Type of regulated procedure',
      hint: `For example: long term anaesthesia or surgical implantation in fish`
    }
  },
  errors: {
    procedures: {
      required: 'You need to select at least one procedure'
    }
  },
  pil: {
    procedures: {
      title: 'Which procedures do you want to be licensed to carry out?'
    }
  },
  buttons: {
    submit: 'Continue'
  },
  'cat-e': 'To apply for category E, contact the course provider.'
};
