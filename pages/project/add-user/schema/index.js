module.exports = profiles => {
  return {
    profile: {
      inputType: 'select',
      options: profiles.map(p => ({ value: p.id, label: `${p.firstName} ${p.lastName}` }))
    }
  };
};
