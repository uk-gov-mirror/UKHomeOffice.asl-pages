const page = require('../../lib/page');
const { setEstablishment, setData, setSchema } = require('../../lib/actions');
const { places } = require('../../lib/schema');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname,
    reducers: [
      'establishment',
      'list',
      'filters',
      'sort'
    ]
  });

  app.get('/', (req, res, next) => {
    req.api(`/establishment/${req.establishment}`)
      .then(response => {
        res.establishment = response.json.data;
      })
      .then(() => next())
      .catch(next);
  });

  app.get('/', (req, res, next) => {
    req.api(`/establishment/${req.establishment}/places`)
      .then(response => {
        res.data = response.json.data;
      })
      .then(() => next())
      .catch(next);
  });

  app.get('/', (req, res, next) => {
    res.store.dispatch(setEstablishment(res.establishment));
    res.store.dispatch(setSchema(places));
    res.store.dispatch(setData(res.data));
    next();
  });

  return app;
};
