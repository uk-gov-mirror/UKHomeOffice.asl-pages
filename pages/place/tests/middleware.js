module.exports = (req, res, next) => {
  req.establishmentId = 8201;
  req.place = 'place-abc';
  next();
};
