module.exports = (req, res, next) => {
  req.establishmentId = 'abc-123';
  return next();
};
