module.exports = (req, res, next) => {
  req.establishment = 'establishment-abc';
  next();
};
