module.exports = (req, res, next) => {
  req.establishmentId = 8201;
  next();
};
