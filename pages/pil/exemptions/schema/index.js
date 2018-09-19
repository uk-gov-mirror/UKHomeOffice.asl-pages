const EXEMPT_OPTIONS = ['Yes', 'No'];

module.exports = {
  exempt: {
    inputType: 'radioGroup',
    validate: [
      'required',
      {
        definedValues: EXEMPT_OPTIONS
      }
    ],
    options: EXEMPT_OPTIONS
  }
};
