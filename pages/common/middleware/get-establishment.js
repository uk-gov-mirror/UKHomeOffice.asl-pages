const { setEstablishment } = require('../../../lib/actions');

module.exports = settings => (req, res, next) => {
  req.api(`/establishment/${req.establishment}`)
    .then(response => {
      res.store.dispatch(setEstablishment(response.json.data));
    })
    .then(() => next())
    .catch(next);
};
