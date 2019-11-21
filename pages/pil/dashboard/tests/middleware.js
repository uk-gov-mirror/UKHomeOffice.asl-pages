module.exports = (req, res, next) => {
  req.pil = {
    procedures: []
  };

  req.profile = {
    exemptions: [],
    certificates: []
  };

  res.locals.static.establishment = {
    name: 'University of Croydon'
  };
  next();
}
