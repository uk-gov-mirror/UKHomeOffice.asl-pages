const { Router } = require('express');

const account = require('./account');
const update = require('./update');
const updateEmail = require('./update-email');

module.exports = () => {

  const router = Router();

  router.use((req, res, next) => {
    req.api('/me')
      .then(({ json: { data, meta } }) => {
        req.model = data;
        req.model.openTasks = meta.openTasks || [];
        res.locals.model = req.model;
      })
      .then(() => next())
      .catch(next);
  });

  router.use((req, res, next) => {
    req.breadcrumb('account.menu');
    next();
  });

  router.use('/', account());
  router.use('/edit', update());
  router.use('/update-email', updateEmail());

  return router;

};
