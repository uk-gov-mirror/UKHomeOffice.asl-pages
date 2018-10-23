const { Router } = require('express');

const account = require('./account');
const update = require('./update');
const { routeBuilder } = require('../../lib/middleware');

module.exports = () => {

  const router = Router();

  router.use(routeBuilder());

  router.use((req, res, next) => {
    req.model = req.user.profile;
    res.locals.model = req.model;
    next();
  });

  router.use('/', account());
  router.use('/edit', update());

  return router;

};
