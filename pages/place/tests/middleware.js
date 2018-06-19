module.exports = (req, res, next) => {
  req.establishment = 'establishment-abc';
  req.place = 'place-abc';
  next();
};