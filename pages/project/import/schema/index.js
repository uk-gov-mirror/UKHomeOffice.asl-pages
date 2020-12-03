module.exports = {
  upload: {
    inputType: 'inputFile',
    validate: [
      'fileRequired',
      // 15MB
      { maxSize: 1.5e+7 },
      {
        mimeType: [
          'application/octet-stream',
          'text/plain'
        ]
      },
      {
        ext: [
          'ppl',
          'txt'
        ]
      }
    ]
  }
};
