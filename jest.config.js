module.exports = {
  testURL: 'http://localhost/',
  moduleDirectories: ['pages/common', 'node_modules', 'lib'],
  transformIgnorePatterns: [
    'node_modules/(?!(@ukhomeoffice|@asl))'
  ],
  setupFilesAfterEnv: ['<rootDir>/enzyme.setup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer']
};
