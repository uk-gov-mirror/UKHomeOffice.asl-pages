module.exports = (establishments, pil) => {
  const options = establishments
    .filter(e => e.id !== pil.establishmentId)
    .map(establishment => ({
      label: establishment.name,
      value: establishment.id.toString()
    }));

  return {
    establishment: {
      inputType: 'radioGroup',
      options,
      validate: [
        'required',
        {
          definedValues: options.map(o => o.value)
        }
      ]
    }
  };
};
