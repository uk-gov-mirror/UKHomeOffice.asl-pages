// const { set } = require('lodash');
const page = require('../../../lib/page');
const form = require('../../common/routers/form');
const schema = require('./schema');
// const { crumbs } = require('@asl/service/ui/middleware');

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings
  });

  app.use((req, res, next) => {
    console.log(req.model);
    next();
  });

  app.use('/', form({ schema }));

  app.post('/', (req, res, next) => {
    return res.redirect(req.originalUrl.replace(/training/, 'modules'));
  });

  return app;
};
