module.exports = {
  email: {
    inputType: 'inputText',
    validate: [
      'required',
      {
        customValidate: (fieldValue, formValues, model) => {
          return fieldValue !== model.email && /^\S+@\S+$/.test(fieldValue);
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
