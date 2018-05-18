const page = require('../../lib/page');
const { setProfile, setEstablishment } = require('../../lib/actions');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname,
    reducers: [
      'profile',
      'establishment'
    ]
  });

  app.get('/', (req, res, next) => {
    req.api(`/establishment/${req.establishment}/profile/${req.profile}`)
      .then(response => {
        res.data = response.json.data;
      })
      .then(() => next())
      .catch(next);
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
    res.store.dispatch(setProfile(res.data));
    res.store.dispatch(setEstablishment(res.establishment));
    next();
  });

  return app;
};
