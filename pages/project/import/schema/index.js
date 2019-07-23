module.exports = {
  upload: {
    inputType: 'inputFile',
    validate: [
      'fileRequired',
      // 5MB
      { maxSize: 5e+6 },
      { mimeType: 'application/octet-stream' },
      { ext: 'ppl' }
    ]
  }
};
