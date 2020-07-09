const MIN_CHARS = 10;
const MIN_UPPER = 1;
const MIN_LOWER = 1;
const MIN_DIGIT = 1;

const hasAtLeastMinChars = password => password.length >= MIN_CHARS;
const hasAtLeastMinUppercase = password => (password.match(/[A-Z]/g) || []).length >= MIN_UPPER;
const hasAtLeastMinLowercase = password => (password.match(/[a-z]/g) || []).length >= MIN_LOWER;
const hasAtLeastMinDigits = password => (password.match(/\d/g) || []).length >= MIN_DIGIT;

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
        customValidate: (password, formValues) => {
          return hasAtLeastMinChars(password) &&
            hasAtLeastMinUppercase(password) &&
            hasAtLeastMinLowercase(password) &&
            hasAtLeastMinDigits(password) &&
            formValues.password === formValues.passwordConfirm; // duplicate comparison here so that field highlights on mismatch
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
