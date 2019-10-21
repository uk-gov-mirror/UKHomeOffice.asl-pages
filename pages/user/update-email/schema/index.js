module.exports = {
  email: {
    inputType: 'inputText',
    validate: [
      'required',
      {
        customValidate: (fieldValue, formValues, model) => {
          return fieldValue !== model.email;
        }
      }
    ]
  },
  emailConfirm: {
    inputType: 'inputText',
    validate: [
      'required',
      {
        customValidate: (fieldValue, formValues) => {
          return formValues.email === formValues.emailConfirm;
        }
      }
    ]
  },
  password: {
    inputType: 'inputPassword',
    validate: ['required']
  }
};
