module.exports = (req, res, next) => {
  req.profile = 'abc-123';
  next();
};