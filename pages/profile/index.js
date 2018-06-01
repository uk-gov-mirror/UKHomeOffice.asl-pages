const { merge } = require('lodash');
const page = require('../../lib/page');
const { setItem, setEstablishment } = require('../../lib/actions');
const pageContent = require('./content');

module.exports = ({ content } = {}) => {
  const app = page({
    root: __dirname,
    reducers: [
      'profile',
      'establishment'
    ],
    pageContent: merge({}, pageContent, content)
  });

  app.get('/', (req, res, next) => {
    req.api(`/establishment/${req.establishment}/profile/${req.profile}`)
      .then(response => {
        res.establishment = response.json.meta.establishment;
        if (response.json.data) {
          res.data = response.json.data;
        } else {
          throw new Error('Profile not found');
        }
      })
      .then(() => next())
      .catch(next);
  });

  app.get('/', (req, res, next) => {
    res.store.dispatch(setItem(res.data));
    res.store.dispatch(setEstablishment(res.establishment));
    next();
  });

  return app;
};
