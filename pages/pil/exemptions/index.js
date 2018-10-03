const page = require('../../../lib/page');
const form = require('../../common/routers/form');
const schema = require('./schema');

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings
  });

  app.use('/', form({ schema }));

  app.post('/', (req, res, next) => {

    if (req.body.exempt === 'Yes') {
      return res.redirect(req.originalUrl.concat('/modules'));
    } else {
      return res.redirect(req.originalUrl.replace(/\/exemptions/, ''));
    }

  });

  return app;
};
