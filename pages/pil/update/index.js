const { uniq, flattenDeep, merge } = require('lodash');
const { page } = require('@asl/service/ui');
const form = require('../../common/routers/form');
const schema = require('./schema');
const { get, pick, omit } = require('lodash');

const success = require('../../common/routers/success');
const procedures = require('../procedures');
const exemptions = require('../exemptions');
const training = require('../training');

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

  app.use((req, res, next) => {
    if (req.model.status === 'active') {
      req.breadcrumb('pil.update');
    } else {
      req.breadcrumb('pil.create');
    }

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

    const certificateSpecies = flattenDeep(req.profile.certificates.map(c => c.species));
    const exemptionsSpecies = flattenDeep(req.profile.exemptions.map(e => e.species));
    const species = certificateSpecies.concat(exemptionsSpecies).filter(Boolean);

    req.model = {
      ...req.model,
      ...values,
      species: uniq(species)
    };

    next();
  });

  app.post('/', updateDataFromTask(sendData));

  app.use(form({
    configure: (req, res, next) => {
      req.form.schema = req.user.profile.asruUser ? omit(schema, 'declarations') : schema;
      next();
    },
    validate: (req, res, next) => {
      if (!req.model.procedures.length) {
        return next({ validation: { form: 'incomplete' } });
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
      .then(() => res.redirect(req.originalUrl + '/success'))
      .catch(next);
  });

  app.use('/success', (req, res, next) => {
    success({
      licence: 'pil',
      status: get(req.model, 'openTasks[0].status', 'autoresolved')
    })(req, res, next);
  });

  app.use('/procedures', procedures());

  app.use('/exemptions', exemptions());

  app.use('/training', training());

  app.use((req, res) => res.sendResponse());

  return app;
};
