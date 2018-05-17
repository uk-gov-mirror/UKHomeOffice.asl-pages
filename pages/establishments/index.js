const page = require('../../lib/page');
const { setData, setSchema } = require('../../lib/actions');
const { establishments } = require('../../lib/schema');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname,
    csv: true,
    reducers: [
      'list',
      'filters',
      'sort'
    ]
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
    res.store.dispatch(setSchema(establishments));
    res.store.dispatch(setData(res.data));
    next();
  });

  return app;
};
