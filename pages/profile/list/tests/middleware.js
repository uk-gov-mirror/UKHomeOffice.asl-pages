module.exports = (req, res, next) => {
  req.establishmentId = 'establishment-abc';
  next();
};
