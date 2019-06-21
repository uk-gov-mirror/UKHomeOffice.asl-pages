module.exports = profiles => {
  return {
    licenceHolder: {
      inputType: 'select',
      validate: [
        'required',
        { definedValues: profiles.map(p => p.id) },
        { customValidate: (field, values, model) => field !== model.licenceHolderId }
      ],
      accessor: 'id',
      options: profiles.map(profile => {
        return {
          value: profile.id,
          label: `${profile.firstName} ${profile.lastName} - ${profile.email}`
        };
      })
    }
  };
};
