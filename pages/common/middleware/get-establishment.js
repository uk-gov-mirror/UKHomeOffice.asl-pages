module.exports = settings => (req, res, next) => {
  req.api(`/establishment/${req.establishment}`)
    .then(({ json: { data } }) => {
      res.locals.static.establishment = data;
    })
    .then(() => next())
    .catch(next);
};
