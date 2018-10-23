const page = require('../../../lib/page');
const form = require('../../common/routers/form');
const schema = require('./schema');
const { omit, pick } = require('lodash');

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings
  });

  app.use('/', form({ schema }));

  app.post('/', (req, res, next) => {
    const fields = ['certificateNumber', 'accreditingBody', 'passDate', 'modules'];
    let values = omit(req.form.values, 'exempt');
    values = pick(req.session.form[req.model.id].values, fields);
    values.profileId = req.profileId;

    values.modules = values.modules.map(module => ({ module, species: [] }));

    const opts = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(values)
    };

    return req.api(`/establishment/${req.establishmentId}/profiles/${req.profileId}/training`, opts)
      .then(() => {
        delete req.session.form[req.model.id];
        return next();
      })
      .catch(next);
  });

  app.post('/', (req, res, next) => {
    return res.redirect(req.buildRoute('pil.dashboard', {pil: req.profileData.pil.id}));
  });

  return app;
};
