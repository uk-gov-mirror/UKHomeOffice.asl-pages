const { Router } = require('express');
const { get } = require('lodash');
const endorse = require('../../../project-version/update/endorse/routers/endorse');

module.exports = () => {
  const app = Router({ mergeParams: true });

  app.use((req, res, next) => {
    req.model.licenceHolder = req.proposedLicenceHolder;
    next();
  });

  app.use(endorse({ omitCommentsField: true }));

  app.post('/', (req, res, next) => {
    const { values, meta } = get(req.session, `form.${req.model.id}`);
    const opts = {
      method: 'PUT',
      json: {
        data: values,
        meta
      }
    };

    return req.api(`/establishment/${req.establishmentId}/projects/${req.projectId}/update-licence-holder`, opts);
  });

  return app;
};
