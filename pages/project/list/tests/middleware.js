module.exports = (req, res, next) => {
  req.establishment = 'abc-123';
  return next();
};
