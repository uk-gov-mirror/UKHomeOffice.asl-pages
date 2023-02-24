const { Router } = require('express');
const { get, pick, merge, isEmpty } = require('lodash');
const form = require('../../../common/routers/form');
const schema = require('../schema');
const { updateDataFromTask, redirectToTaskIfOpen, populateEstablishmentProfiles, populateNamedPeople } = require('../../../common/middleware');
const content = require('../../../common/content');

module.exports = () => {

  const sendData = (req, params = {}) => {
    const values = req.session.form[req.model.id].values;

    values.authorisations = values.authorisations.map(authorisation => ({
      ...authorisation,
      establishmentId: req.establishmentId
    }));

    const opts = {
      method: 'PUT',
      json: merge({
        data: pick(values, ['name', 'corporateStatus', 'legalName', 'legalPhone', 'legalEmail', 'address', 'country', 'procedure', 'breeding', 'supplying', 'authorisations', 'isTrainingEstablishment', 'pelh', 'nprc']),
        meta: {
          comments: values.comments,
          declaration: content.fields.declaration.label
        }
      }, params)
    };

    return req.api(`/establishment/${req.establishmentId}`, opts);
  };

  const app = Router();

  app.post('/', updateDataFromTask(sendData));

  app.use(populateNamedPeople, populateEstablishmentProfiles, form({
    requiresDeclaration: req => !req.user.profile.asruUser,
    checkSession: (req, res, next) => {
      const values = get(req.session, `form.${req.model.id}.values`);
      if (!isEmpty(values)) {
        return next();
      }
      return res.redirect(req.buildRoute('establishment.update'));
    },
    editAnswers: (req, res, next) => {
      delete req.session.form[req.model.id].validationErrors;
      return res.redirect(req.buildRoute('establishment.update'));
    },
    cancelEdit: (req, res, next) => {
      delete req.session.form[req.model.id];
      return res.redirect(req.buildRoute('establishment.read'));
    }
  }));

  app.get('/', (req, res, next) => {
    Object.assign(res.locals.static, {
      diffSchema: schema(),
      before: req.model,
      after: req.session.form[req.model.id].values,
      establishmentProfiles: req.establishment.profiles
    });
    next();
  });

  app.post('/', redirectToTaskIfOpen());

  app.post('/', (req, res, next) => {
    sendData(req)
      .then(response => {
        req.session.success = { taskId: get(response, 'json.data.id') };
        delete req.session.form[req.model.id];
        return res.redirect(req.buildRoute('establishment.update', { suffix: 'success' }));
      })
      .catch(next);
  });

  app.get('/', (req, res) => res.sendResponse());

  return app;
};
