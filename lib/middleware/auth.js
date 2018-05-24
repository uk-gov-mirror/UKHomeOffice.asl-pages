module.exports = (task) => (req, res, next) => {
  req.user.can(task, req.params)
    .then(allowed => {
      if (allowed) {
        return next();
      }
      const err = new Error('Not authorised');
      err.status = 403;
      return next(err);
    })
    .catch(next);
};
