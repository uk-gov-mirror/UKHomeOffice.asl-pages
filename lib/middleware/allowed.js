const allowed = () => (req, res, next) => {
  Promise.resolve().then(() => {
    if (req.user.profile.id !== req.profileId) {
      return next();
    }
    const err = new Error('Forbidden');
    err.status = 403;
    throw err;
  }).catch(next);

};

module.exports = {
  allowed
};
