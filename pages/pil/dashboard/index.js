const { page } = require('@asl/service/ui');
const { get, pick, omit, merge } = require('lodash');
const form = require('../../common/routers/form');
const schema = require('./schema');
const { success } = require('../../common/routers');
const { hydrate, updateDataFromTask, redirectToTaskIfOpen } = require('../../common/middleware');

module.exports = settings => {
  const sendData = (req, params = {}) => {
    const opts = {
      method: 'PUT',
      json: merge({
        data: pick(req.model, 'procedures', 'notesCatD', 'notesCatF', 'species')
      }, params)
    };
    return req.api(`/establishment/${req.establishmentId}/profiles/${req.profileId}/pil/${req.pilId}/grant`, opts);
  };

  const app = page({
    ...settings,
    root: __dirname,
    paths: ['/success']
  });

  app.get('/', hydrate());

  app.use('/', (req, res, next) => {
    const params = {
      id: req.pilId,
      profileId: req.model.profileId,
      establishment: req.model.establishmentId
    };

    req.user.can('pil.update', params)
      .then(can => can ? next() : next(new Error('Unauthorised')))
      .catch(next);
  });

  app.use((req, res, next) => {
    const values = get(req.session, `form[${req.model.id}].values`);
    req.model = { ...req.model, ...values };
    next();
  });

  app.post('/', updateDataFromTask(sendData));

  app.use(form({
    configure: (req, res, next) => {
      req.form.schema = req.user.profile.asruUser ? omit(schema, 'declarations') : schema;
      next();
    },
    validate: (req, res, next) => {
      const skipExemptions = get(req.session, [req.profileId, 'skipExemptions'], null);
      const skipTraining = get(req.session, [req.profileId, 'skipTraining'], null);

      const sectionComplete = {
        procedures: !!(req.model.procedures && req.model.procedures.length),
        species: !!(req.model.species && req.model.species.length),
        training: !!((req.profile.certificates && req.profile.certificates.length) || skipTraining),
        exemptions: !!((req.profile.exemptions && req.profile.exemptions.length) || skipExemptions)
      };

      if (!sectionComplete.procedures) {
        return next({ validation: { procedures: 'incomplete' } });
      }

      if (!sectionComplete.species) {
        return next({ validation: { species: 'incomplete' } });
      }

      if (!sectionComplete.training) {
        return next({ validation: { training: 'incomplete' } });
      }

      if (!sectionComplete.exemptions) {
        return next({ validation: { exemptions: 'incomplete' } });
      }

      next();
    },
    locals: (req, res, next) => {
      res.locals.static.profile = req.profile;
      res.locals.static.skipExemptions = get(req.session, [req.profileId, 'skipExemptions'], null);
      res.locals.static.skipTraining = get(req.session, [req.profileId, 'skipTraining'], null);
      res.locals.static.isAsru = req.user.profile.asruUser;
      res.locals.static.isLicensing = req.user.profile.asruLicensing;
      next();
    }
  }));

  app.post('/', redirectToTaskIfOpen());

  app.post('/', (req, res, next) => {
    sendData(req)
      .then(() => res.redirect(req.buildRoute('pil.update', { suffix: 'success' })))
      .catch(next);
  });

  app.get('/success', (req, res, next) => {
    success({
      licence: 'pil',
      status: get(req.model, 'openTasks[0].status', 'autoresolved')
    })(req, res, next);
  });

  app.get((req, res) => res.sendResponse());

  return app;
};
