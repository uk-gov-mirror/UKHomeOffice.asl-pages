const { page } = require('@asl/service/ui');
const UnauthorisedError = require('@asl/service/errors/unauthorised');
const { get, pick, merge, every } = require('lodash');
const form = require('../../common/routers/form');
const success = require('../../success');
const { hydrate, updateDataFromTask, redirectToTaskIfOpen } = require('../../common/middleware');
const { canUpdateModel, canTransferPil } = require('../../../lib/utils');

module.exports = settings => {
  const sendData = (req, params = {}) => {
    let action = 'grant';

    const opts = {
      method: 'PUT',
      json: merge({
        data: pick(req.model, 'procedures', 'notesCatD', 'notesCatF', 'species')
      }, params)
    };

    if (req.model.establishment.to) {
      action = 'transfer';
      opts.json.data.establishment = req.model.establishment;
    }

    return req.api(`/establishment/${req.establishmentId}/profiles/${req.profileId}/pil/${req.pilId}/${action}`, opts);
  };

  const app = page({
    ...settings,
    root: __dirname,
    paths: ['/success']
  });

  app.get('/', (req, res, next) => {
    if (!canUpdateModel(req.model)) {
      return res.redirect(req.buildRoute('task.read', { taskId: req.model.openTasks[0].id }));
    }
    next();
  });

  app.get('/', hydrate());

  app.use((req, res, next) => {
    if (req.establishment.id !== req.pil.establishmentId) {
      next(new UnauthorisedError());
    }
    next();
  });

  app.use((req, res, next) => {
    const values = get(req.session, `form[${req.model.id}].values`);
    req.model = { ...req.model, ...values };

    const establishmentTransfer = req.profile.establishments
      .filter(e => e.id !== req.establishment.id)
      .find(e => e.id === get(req.model, 'establishmentId'));

    const trainingUpToDate = get(req.session, `form[${req.model.id}-training].values.update`) === false;
    res.locals.static.trainingUpToDate = trainingUpToDate;

    req.model.establishment = {
      from: pick(req.establishment, ['id', 'name']),
      to: establishmentTransfer ? pick(establishmentTransfer, ['id', 'name']) : null
    };

    next();
  });

  app.post('/', updateDataFromTask(sendData));

  app.use(form({
    requiresDeclaration: req => !req.user.profile.asruUser,
    validate: (req, res, next) => {
      const update = get(req.session, `form[${req.model.id}-training].values.update`);
      const sectionComplete = {
        procedures: !!(req.model.procedures && req.model.procedures.length),
        species: !!(req.model.species && req.model.species.length),
        training: !!((req.profile.certificates && req.profile.certificates.length) || update === false)
      };

      if (!every(sectionComplete, Boolean)) {
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
      res.locals.static.pil = req.pil;

      return canTransferPil(req)
        .then(canTransfer => {
          res.locals.static.canTransferPil = canTransfer;
        })
        .then(() => next())
        .catch(next);
    }
  }));

  app.post('/', redirectToTaskIfOpen());

  app.post('/', (req, res, next) => {
    sendData(req)
      .then(response => {
        req.session.success = { taskId: get(response, 'json.data.id') };
        delete req.session.form[req.model.id];
        return res.redirect(req.buildRoute('pil.update', { suffix: 'success' }));
      })
      .catch(next);
  });

  app.get('/success', success());

  app.get((req, res) => res.sendResponse());

  return app;
};
