module.exports = {
  upload: {
    inputType: 'inputFile',
    validate: [
      'fileRequired',
      // 15MB
      { maxSize: 1.5e7 },
      {
        ext: ['doc', 'docx', 'pdf']
      }
    ]
  }
};
