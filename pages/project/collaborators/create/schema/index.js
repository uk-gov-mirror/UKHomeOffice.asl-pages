module.exports = profiles => {
  return {
    profile: {
      inputType: 'autoComplete',
      options: profiles.map(p => ({ value: p.id, label: `${p.firstName} ${p.lastName}` })),
      validate: 'required'
    },
    role: {
      inputType: 'radioGroup',
      options: [
        'basic',
        'edit'
      ]
    }
  };
};
