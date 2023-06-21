const { get, uniqBy } = require('lodash');

const getAdditionalEstablishments = (project, version) => {
  // Honor when other-establishments has been set to false
  const hasAdditionalEstablishments = get(version, 'data.other-establishments', false);
  const proposedAdditionalEstablishments = hasAdditionalEstablishments
    ? get(version, 'data.establishments', []).filter(e => e['establishment-id'])
    : [];
  const removedAAIds = get(version, 'data.establishments', []).filter(e => e.deleted).map(e => e['establishment-id']);
  const projectAdditionalEstablishments = project.additionalEstablishments.filter(e => e.status !== 'removed');

  return uniqBy([
    ...projectAdditionalEstablishments,
    ...proposedAdditionalEstablishments
  ], est => est['establishment-id'] || est.id).filter(e => !removedAAIds.includes(e.id));
};

module.exports = {
  getAdditionalEstablishments
};
