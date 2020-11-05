const versions = {
  0: require('./legacy'),
  1: require('./standard')
};

module.exports = (schemaVersion) => {
  return versions[schemaVersion];
};
