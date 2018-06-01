const { reduce, some, isEqual } = require('lodash');
const { Router } = require('express');
const bodyParser = require('body-parser');
const submitChange = require('../middleware/submit-change');

const castArray = data => Array.isArray(data) ? data : [data];

const hasChanged = (value, key, item) => {
  if (Array.isArray(value)) {
    return !isEqual([ ...value ].sort(), [ ...item[key] ].sort());
  }
  return value !== item[key];
};

module.exports = () => {
  const app = Router();

  app.post('/', bodyParser.urlencoded({ extended: false }));

  app.post('/confirm', (req, res, next) => {
    if (req.session.data && req.session.data[req.place]) {
      return submitChange()
        .then(() => {
          res.redirect(req.originalUrl.replace(/\/confirm/, '/success'));
        })
        .catch(next);
    }
    return res.redirect(req.originalUrl);
  });

  app.post('/', (req, res, next) => {
    const { item } = res.store.getState();

    const data = reduce(req.body, (obj, value, key) => {
      return {
        ...obj,
        [key]: Array.isArray(item[key])
          ? castArray(value)
          : value || null
      };
    }, {});

    if (some(data, (value, key) => hasChanged(value, key, item))) {
      req.session.data = { [req.place]: data };
      return res.redirect(`${req.originalUrl}/confirm`);
    }
    return res.redirect(`${req.originalUrl}`);
  });

  return app;
};
