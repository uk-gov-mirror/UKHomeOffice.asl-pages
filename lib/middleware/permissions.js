module.exports = task => (req, res, next) => {
  if (req.user.isAllowed(task)) {
    return next();
  }
  const err = new Error('Unauthorised');
  err.status = 401;
  next(err);
};
