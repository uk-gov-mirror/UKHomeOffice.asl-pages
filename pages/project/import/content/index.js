module.exports = {
  title: 'Upload draft application',
  hint: 'You can upload a project created on the drafting tool.',
  fields: {
    upload: {
      label: 'Choose the .ppl file of the project you want to upload.'
    }
  },
  errors: {
    upload: {
      fileRequired: 'Select a PPL',
      maxSize: 'The PPL should be smaller than 5MB',
      mimeType: 'The selected file must be a PPL',
      ext: 'The selected file must be a PPL'
    }
  }
};
