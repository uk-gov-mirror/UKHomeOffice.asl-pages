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
      res.locals.static.isAsruUser = req.user.profile.asruUser;
      console.log('ENFORCEMENT FLAGS MIDDLEWARE HIT');
    })
    .then(() => next())
    .catch(next);
};
