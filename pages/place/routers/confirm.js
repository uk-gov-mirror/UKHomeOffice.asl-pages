const { mapValues } = require('lodash');
const { Router } = require('express');
const { getRoles } = require('../middleware');
const { setDiff } = require('../../../lib/actions');
const { parse } = require('url');

module.exports = settings => {
  const app = Router();

  app.get('/', (req, res, next) => {
    const { clear, edit } = req.query;
    if (clear) {
      delete req.session.data[req.place];
    }
    if (clear || edit) {
      const url = parse(req.originalUrl).pathname;
      return res.redirect(url.replace(/\/confirm/, ''));
    }
    next();
  });

  app.get('/', (req, res, next) => {
    if (req.session.data && req.session.data[req.place]) {
      return next();
    }
    return res.redirect(req.originalUrl.replace(/\/confirm$/, ''));
  });

  app.get('/', (req, res, next) => {
    const { item } = res.store.getState();
    getRoles(req)
      .then(roles => {
        const getNacwoName = id => {
          const nacwo = roles.filter(r => r.type === 'nacwo').find(n => n.id === id);
          return nacwo && nacwo.profile.name;
        };

        res.store.dispatch(
          setDiff(
            mapValues(req.session.data[req.place], (newValue, key) => {
              return {
                oldValue: key === 'nacwo' ? getNacwoName(item[key]) : item[key],
                newValue: key === 'nacwo' ? getNacwoName(newValue) : newValue
              };
            })
          )
        );
      })
      .then(() => next())
      .catch(next);
  });

  return app;
};
