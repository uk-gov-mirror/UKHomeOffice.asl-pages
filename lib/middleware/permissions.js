module.exports = task => (req, res, next) => {
  req.user.can(task, { ...req.params, establishment: req.establishment })
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
