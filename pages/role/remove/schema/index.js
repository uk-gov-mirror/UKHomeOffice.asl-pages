module.exports = roles => {
  return {
    type: {
      inputType: 'radioGroup',
      validate: [
        'required',
        {
          definedValues: roles
        }
      ],
      options: roles,
      nullValue: []
    },
    comment: {
      inputType: 'textarea'
    }
  };
};
