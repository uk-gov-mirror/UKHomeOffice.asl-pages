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
    const {
      establishmentId,
      profileId,
      id
    } = req.profile.pil;
    if (req.body.exempt === 'Yes') {
      set(req.session, `${req.profileId}.skipExemptions`, false);
      return res.redirect(req.buildRoute('pil.exemptionModules', {establishment: establishmentId, profile: profileId, pil: id}));
    } else {
      set(req.session, `${req.profileId}.skipExemptions`, true);
      return res.redirect(req.buildRoute('pil.application', {establishment: establishmentId, profile: profileId, pil: id}));
    }
  });

  app.use('/modules', require('../modules-exempt')());

  return app;
};
