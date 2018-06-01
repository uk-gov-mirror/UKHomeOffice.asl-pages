const { Router } = require('express');
const { setItem } = require('../../../lib/actions');
const { getEstablishment } = require('../../common/middleware');
const { getPlace, setSchema } = require('../middleware');
const update = require('./update');
const confirm = require('./confirm');
const success = require('./success');

module.exports = settings => {
  const app = Router();

  app.use(getEstablishment());
  app.use(getPlace({ parseItem: item => ({ ...item, nacwo: item.nacwo.id }) }));

  app.get('/', (req, res, next) => {
    if (req.session.data && req.session.data[req.place]) {
      const { item } = res.store.getState();
      res.store.dispatch(setItem({ ...item, ...req.session.data[req.place] }));
    }
    next();
  });
  app.get('/', setSchema());

  app.use('/confirm', confirm());
  app.use('/success', success());

  app.use('/', update());

  return app;
};
