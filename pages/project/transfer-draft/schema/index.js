module.exports = (establishments) => {
  return {
    primaryEstablishment: {
      inputType: 'radioGroup',
      options: establishments.map(e => ({
        label: e.name,
        value: e.id.toString()
      })),
      validate: [
        'required',
        {
          definedValues: establishments.map(e => e.id.toString())
        },
        {
          customValidate: (field, values, model) => field !== model.primaryEstablishment
        }
      ]
    }
  };
};
