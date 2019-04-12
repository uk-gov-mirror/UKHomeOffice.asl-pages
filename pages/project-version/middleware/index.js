const getVersion = () => (req, res, next) => {
  req.api(`/establishments/${req.establishmentId}/projects/${req.projectId}/project-versions/${req.versionId}`)
    .then(({ json: { data } }) => {
      req.version = data;
    })
    .then(() => next())
    .catch(next);
};

module.exports = {
  getVersion
};
