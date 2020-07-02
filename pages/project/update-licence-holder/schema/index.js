module.exports = profiles => {
  return {
    licenceHolderId: {
      inputType: 'autoComplete',
      validate: [
        'required',
        { definedValues: profiles.map(p => p.id) },
        { customValidate: (field, values, model) => field !== model.licenceHolderId }
      ],
      options: profiles.map(profile => {
        return {
          value: profile.id,
          label: `${profile.firstName} ${profile.lastName} - ${profile.email}`
        };
      })
    }
  };
};
