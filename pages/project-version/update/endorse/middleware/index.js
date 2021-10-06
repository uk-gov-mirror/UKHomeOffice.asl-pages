function userCanEndorse(req, res, next) {
  const params = {
    projectId: req.project.id,
    establishmentId: req.establishmentId
  };
  req.user.can('project.endorse', params)
    .then(canEndorse => {
      req.canEndorse = canEndorse;
      res.locals.static.canEndorse = canEndorse;
    })
    .then(() => next())
    .catch(next);
}

module.exports = {
  userCanEndorse
};
