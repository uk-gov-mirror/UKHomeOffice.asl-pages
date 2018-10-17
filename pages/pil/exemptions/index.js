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
      req.session.skipExemptions = false;
      return res.redirect(req.originalUrl.concat('/modules'));
    } else {
      req.session.skipExemptions = true;
      return res.redirect(req.originalUrl.replace(/\/exemptions/, ''));
    }

  });

  app.use('/modules', require('../modules-exempt')());

  return app;
};
