const path = require('path');
const page = require('../../lib/page');
const { setData, setSchema } = require('../../lib/actions');
const { establishments } = require('../../lib/schema');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname,
    name: 'establishments',
    apiPath: '/establishments',
    rootReducer: require('./root-reducer'),
    csv: true
  });

  app.page.use((req, res, next) => {
    res.store.dispatch(setSchema(establishments));
    res.store.dispatch(setData(res.data));
    next();
  });

  return app;
};
