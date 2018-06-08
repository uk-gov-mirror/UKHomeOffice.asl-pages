const { setItem } = require('../../../lib/actions');

module.exports = (settings = {}) => (req, res, next) => {
  req.api(`/establishment/${req.establishment}/places/${req.place}`)
    .then(response => {
      const item = settings.parseItem ? settings.parseItem(response.json.data) : response.json.data;
      res.store.dispatch(setItem(item));
    })
    .then(() => next())
    .catch(next);
};
