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
      fileRequired: 'Choose a file to import',
      maxSize: 'Only files smaller than 5mb can be uploaded',
      mimeType: 'Only .ppl files can be uploaded',
      ext: 'Only .ppl files can be uploaded'
    }
  }
};
