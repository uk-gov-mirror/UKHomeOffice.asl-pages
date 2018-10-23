const bodyParser = require('body-parser');
const { get } = require('lodash');
const page = require('../../../lib/page');
const form = require('../../common/routers/form');
const schema = require('./schema');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname,
    paths: ['/success']
  });

  app.use(form({
    schema,
    validate: (req, res, next) => {
      if (!req.model.procedures.length) {
        return next({ validation: { form: 'incomplete' } });
      }
      next();
    }
  }));

  const profileOwnsModule = ({ trainingModules, exemptions }, moduleId) => {
    return [ ...trainingModules, ...exemptions ].some(m => m.id === moduleId);
  };

  app.post('/', bodyParser.urlencoded({ extended: true }), (req, res, next) => {
    if (req.body.action === 'submit-pil-application') {
      const pilId = req.profile.pil.id;
      const opts = { method: 'PUT', json: { submittedAt: new Date() } };

      return req.api(`/establishment/${req.establishmentId}/profiles/${req.profileId}/pil/${pilId}`, opts)
        .then(() => res.redirect(req.buildRoute('pil.success', {pil: req.profile.pil.id})))
        .catch(next);

    }

    if (req.body.action === 'delete' && req.body.trainingModuleId) {
      const profile = res.locals.model;
      const trainingModuleId = req.body.trainingModuleId;

      if (!profileOwnsModule(profile, trainingModuleId)) {
        throw new Error('cannot delete training modules the profile does not own');
      }

      const opts = { method: 'DELETE' };

      return req.api(`/establishment/${req.establishment}/profiles/${req.profile}/training/${trainingModuleId}`, opts)
        .then(() => res.redirect(req.buildRoute('pil.application', {pil: req.profile.pil.id})))
        .catch(next);
    }
    return res.redirect(req.buildRoute('pil.application', {pil: req.profile.pil.id}));
  });

  app.use('/', (req, res, next) => {
    req.model.procedures = req.model.procedures || [];
    res.locals.model = req.model;
    res.locals.static.pil = req.model;
    res.locals.static.skipExemptions = get(req.session, `${req.profileId}.skipExemptions`, false);

    // for now, if we've already submitted a pil for this profile, just show the success page
    if (req.model.submittedAt && !req.originalUrl.includes('success')) {
      return res.redirect(req.originalUrl + '/success');
    }

    next();
  });

  app.use('/procedures', require('../procedures')());

  app.use('/exemptions', require('../exemptions')());

  app.use('/training', require('../certificate')());

  return app;
};
