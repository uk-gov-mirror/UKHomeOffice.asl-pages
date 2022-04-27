module.exports = (req, res, next) => {
  if (!req.user.profile.asruUser) {
    return next();
  }

  const model = res.enforcementModel;

  if (!model) {
    return next();
  }

  return req.api(`/enforcement/flags/${model.id}`)
    .then(response => {
      model.enforcementFlags = response.json.data;
      res.locals.static.isAsru = req.user.profile.asruUser;
    })
    .then(() => next())
    .catch(next);
};
