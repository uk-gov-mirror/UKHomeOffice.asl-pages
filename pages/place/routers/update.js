const { some, isEqual } = require('lodash');
const { Router } = require('express');
const bodyParser = require('body-parser');
const submitChange = require('../middleware/submit-change');
const validate = require('../../../lib/middleware/validate');

const castArray = data => {
  if (!data) {
    return [];
  }
  return Array.isArray(data) ? data : [data];
};

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
    const { schema } = req.form;

    const data = Object.keys(schema).reduce((obj, key) => {
      return {
        ...obj,
        [key]: Array.isArray(item[key])
          ? castArray(req.body[key])
          : req.body[key] || null
      };
    }, {});

    req.form.data = { [req.place]: data };
    req.session.data = req.form.data;

    if (some(data, (value, key) => hasChanged(value, key, item))) {
      return next();
    }
    return next({ validation: {
      form: 'unchanged'
    }});
  });

  app.post('/', validate());

  app.post('/', (req, res, next) => {
    delete req.session.validationErrors;
    return res.redirect(`${req.originalUrl}/confirm`);
  });

  app.use('/', (err, req, res, next) => {
    if (err.validation) {
      req.session.validationErrors = err.validation;
      return res.redirect(`${req.originalUrl}`);
    }
    return next(err);
  });

  return app;
};
