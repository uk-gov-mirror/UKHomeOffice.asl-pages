module.exports = (task, params) => (req, res, next) => {
  params = params || req.params;
  req.user.can(task, { ...params, establishment: req.establishmentId })
    .then(allowed => {
      if (allowed) {
        return next();
      }
      const err = new Error('Forbidden');
      err.status = 403;
      throw err;
    })
    .catch(next);
};
