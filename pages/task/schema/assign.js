module.exports = options => {
  return {
    assignedTo: {
      inputType: 'select',
      options: [
        {
          value: null,
          label: 'Unassigned'
        },
        ...options.map(opt => ({ label: `${opt.firstName} ${opt.lastName}`, value: opt.id }))
      ]
    }
  };
};
