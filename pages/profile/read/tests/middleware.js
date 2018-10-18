module.exports = (req, res, next) => {
  req.profileId = 'abc-123';
  next();
};
