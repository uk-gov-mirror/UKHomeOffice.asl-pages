function canViewTransferredProject(req, res, next) {
  if (req.project.status !== 'transferred') {
    return next();
  }
  const params = {
    id: req.project.transferProjectId,
    establishmentId: req.project.transferEstablishmentId,
    licenceHolderId: req.project.licenceHolderId
  };
  req.user.can('project.read.single', params)
    .then(can => {
      if (can) {
        res.locals.static.canViewTransferredProject = true;
      }
    })
    .then(() => next())
    .catch(next);
}

module.exports = {
  canViewTransferredProject
};
