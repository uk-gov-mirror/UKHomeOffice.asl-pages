const { uniq, flattenDeep } = require('lodash');
const { page } = require('@asl/service/ui');
const form = require('../../common/routers/form');
const schema = require('./schema');
const { get, pick } = require('lodash');

const success = require('../../common/routers/success');
const procedures = require('../procedures');
const exemptions = require('../exemptions');
const training = require('../training');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname,
    paths: ['/success']
  });

  app.use((req, res, next) => {
    if (req.pil.status === 'active') {
      req.breadcrumb('pil.update');
    } else {
      req.breadcrumb('pil.create');
    }

    const params = {
      id: req.pilId,
      profileId: req.pil.profileId,
      establishment: req.establishment.id
    };
    req.user.can('pil.update', params)
      .then(can => {
        const authorised = can && req.pil.establishmentId === req.establishment.id;
        if (authorised) {
          return next();
        }
        next(new Error('Unauthorised'));
      })
      .catch(next);
  });

  app.use((req, res, next) => {

    const values = get(req.session, `form[${req.pilId}].values`);

    const trainingSpecies = flattenDeep(req.model.certificates.map(c => c.modules.map(m => m.species)));
    const exemptionsSpecies = flattenDeep(req.model.exemptions.map(e => e.species));
    const species = trainingSpecies.concat(exemptionsSpecies).filter(Boolean);

    req.model = {
      ...req.pil,
      ...values,
      species: uniq(species)
    };

    next();
  });

  app.use(form({
    schema,
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
      next();
    }
  }));

  app.post('/', (req, res, next) => {

    const opts = {
      method: 'PUT',
      json: {
        data: pick(req.model, 'procedures', 'notesCatD', 'notesCatF', 'species')
      }
    };
    req.api(`/establishment/${req.establishmentId}/profiles/${req.profileId}/pil/${req.pilId}/grant`, opts)
      .then(() => {
        delete req.session.form[req.model.id];
      })
      .then(() => res.redirect(req.originalUrl + '/success'))
      .catch(next);
  });

  app.use('/success', success({
    licence: 'pil',
    status: 'resubmitted'
  }));

  app.use('/procedures', procedures());

  app.use('/exemptions', exemptions());

  app.use('/training', training());

  return app;
};
