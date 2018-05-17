const page = require('../../lib/page');
const { setEstablishment, setData } = require('../../lib/actions');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname,
    reducers: [
      'establishment',
      'list',
      'filters',
      'sort'
    ],
    schema: {
      id: {},
      site: {
        show: true,
        filter: true
      },
      area: {
        show: true
      },
      name: {
        show: true
      },
      suitability: {
        show: true,
        filter: true,
        comparator: 'AND',
        exact: true
      },
      holding: {
        show: true,
        filter: true,
        comparator: 'AND',
        exact: true
      },
      updatedAt: {}
    }
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
    res.store.dispatch(setData(res.data));
    next();
  });

  return app;
};
