const { Router } = require('express');
const { get, omit } = require('lodash');
const form = require('../../../common/routers/form');
const schema = require('../schema/declaration');
const experienceFields = require('../schema/experience-fields');

module.exports = () => {
  const app = Router();

  app.use(form({
    schema,
    locals(req, res, next) {
      res.locals.static.fields = experienceFields.fields;
      res.locals.static.project = req.project;
      res.locals.static.values = get(req.session, `form.${req.model.id}.values`);
      req.api(`/establishment/${req.establishmentId}/profiles/${res.locals.static.values.licenceHolder}`)
        .then(({ json: { data } }) => {
          res.locals.static.proposedLicenceHolder = data;
        })
        .then(() => next())
        .catch(next);
    }
  }));

  app.post('/', (req, res, next) => {
    const values = get(req.session, `form.${req.model.id}.values`);
    const params = {
      method: 'PUT',
      json: {
        data: {
          licenceHolderId: values.licenceHolder
        },
        meta: omit(values, 'licenceHolder', 'declaration-1')
      }
    };
    req.api(`/establishment/${req.establishmentId}/projects/${req.projectId}/update-licence-holder`, params)
      .then(() => {
        res.redirect(req.buildRoute('project.updateLicenceHolder.success'));
      })
      .catch(next);
  });

  return app;
};
