module.exports = (settings = {}) => (req, res, next) => {
  req.api(`/establishment/${req.establishment}/places/${req.place}`)
    .then(response => {
      res.locals.item = settings.parseItem ? settings.parseItem(response.json.data) : response.json.data;
    })
    .then(() => next())
    .catch(next);
};
