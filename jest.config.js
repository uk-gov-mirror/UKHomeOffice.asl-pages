module.exports = {
  testURL: 'http://localhost/',
  moduleDirectories: ['pages/common', 'node_modules', 'lib'],
  transformIgnorePatterns: [
    'node_modules/(?!@asl/service)'
  ]
};
