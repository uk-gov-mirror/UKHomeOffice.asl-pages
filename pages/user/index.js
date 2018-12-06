const { Router } = require('express');

const account = require('./account');
const update = require('./update');

module.exports = () => {

  const router = Router();

  router.use((req, res, next) => {
    req.model = req.user.profile;
    res.locals.model = req.model;
    next();
  });

  router.use((req, res, next) => {
    req.breadcrumb('account.menu');
    next();
  });

  router.use('/', account());
  router.use('/edit', update());

  return router;

};
