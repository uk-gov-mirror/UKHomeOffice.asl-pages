const page = require('../../lib/page');
const path = require('path');
const { setEstablishment, setData, setSchema } = require('../../lib/actions');
const { places } = require('../../lib/schema');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname,
    name: 'places',
    rootReducer: require('./root-reducer')
  });

  app.page.use((req, res, next) => {
    res.store.dispatch(setEstablishment(res.establishment));
    res.store.dispatch(setSchema(places));
    res.store.dispatch(setData(res.data));
    next();
  });

  return app;
};
