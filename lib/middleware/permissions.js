module.exports = task => (req, res, next) => {
  req.user.can(task, { ...req.params, establishment: req.establishmentId })
    .then(allowed => {
      if (allowed) {
        return next();
      }
      const err = new Error('Unauthorised');
      err.status = 401;
      throw err;
    })
    .catch(next);
};
