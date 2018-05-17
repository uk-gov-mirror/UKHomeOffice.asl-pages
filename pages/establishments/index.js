const page = require('../../lib/page');
const { setData } = require('../../lib/actions');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname,
    csv: true,
    reducers: [
      'list',
      'filters',
      'sort'
    ],
    schema: {
      name: {
        show: true
      },
      licenceNumber: {
        show: true
      }
    }
  });

  app.get('/', (req, res, next) => {
    req.api(`/establishments`)
      .then(response => {
        res.data = response.json.data;
      })
      .then(() => next())
      .catch(next);
  });

  app.get('/', (req, res, next) => {
    res.store.dispatch(setData(res.data));
    next();
  });

  return app;
};
