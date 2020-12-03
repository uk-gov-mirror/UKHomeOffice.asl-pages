module.exports = {
  title: 'Upload project template',
  hint: 'Upload data from another project to use in your application. You need to have downloaded the application in a .ppl file.',
  fields: {
    upload: {
      label: 'Choose .ppl file'
    }
  },
  buttons: {
    submit: 'Continue'
  },
  errors: {
    upload: {
      fileRequired: 'Select a PPL',
      maxSize: 'The PPL should be smaller than 15MB',
      mimeType: 'The selected file must be a PPL',
      ext: 'The selected file must be a PPL'
    }
  }
};
