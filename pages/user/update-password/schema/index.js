const hasAtLeast10Chars = password => password.length >= 10;
const hasAtLeast1Uppercase = password => (password.match(/[A-Z]/g) || []).length >= 1;
const hasAtLeast1Lowercase = password => (password.match(/[a-z]/g) || []).length >= 1;
const hasAtLeast1Digit = password => (password.match(/\d/g) || []).length >= 1;

module.exports = {
  oldPassword: {
    inputType: 'inputPassword',
    validate: ['required']
  },
  password: {
    inputType: 'inputPassword',
    validate: [
      'required',
      {
        customValidate: (password) => {
          return hasAtLeast10Chars(password) &&
            hasAtLeast1Uppercase(password) &&
            hasAtLeast1Lowercase(password) &&
            hasAtLeast1Digit(password);
        }
      }
    ]
  },
  passwordConfirm: {
    inputType: 'inputPassword',
    validate: [
      'required',
      {
        customValidate: (fieldValue, formValues) => {
          return formValues.password === formValues.passwordConfirm;
        }
      }
    ]
  }
};
