const page = require('../../../lib/page');
const form = require('../../common/routers/form');
const schema = require('./schema');
const { set } = require('lodash');

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings
  });

  app.use('/', form({ schema }));

  app.post('/', (req, res, next) => {
    if (req.body.exempt === 'Yes') {
      set(req.session, `${req.profileId}.skipExemptions`, false);
      return res.redirect(req.buildRoute('pil.exemptionModules', {pil: req.profileData.pil.id}));
    } else {
      set(req.session, `${req.profileId}.skipExemptions`, true);
      return res.redirect(req.buildRoute('pil.dashboard', {pil: req.profileData.pil.id}));
    }
  });

  app.use('/modules', require('../modules-exempt')());

  return app;
};
