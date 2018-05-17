const page = require('../../lib/page');
const path = require('path');
const { setEstablishment } = require('../../lib/actions');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname,
    rootReducer: require('./root-reducer')
  });

  app.page.use((req, res, next) => {
    res.store.dispatch(setEstablishment(res.data))
    next();
  });

  return app;
};
