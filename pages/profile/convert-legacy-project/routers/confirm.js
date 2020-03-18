const { Router } = require('express');
const { get } = require('lodash');
const form = require('../../../common/routers/form');

module.exports = () => {
  const app = Router();

  app.use(form({
    locals(req, res, next) {
      res.locals.model = get(req.session, `form.${req.model.id}.values`);
      next();
    }
  }));

  app.post('/', (req, res, next) => {
    const { title, licenceNumber, issueDate, duration } = req.session.form[req.model.id].values;

    const params = {
      method: 'POST',
      json: {
        data: {
          establishmentId: req.establishmentId,
          licenceHolderId: req.profile.id,
          title,
          licenceNumber,
          issueDate: new Date(issueDate).toISOString(),
          isLegacyStub: true,
          version: {
            data: {
              title,
              duration
            }
          }
        }
      }
    };

    return req.api(`/project/create-stub`, params)
      .then(response => {
        const projectId = get(response, 'json.data.data.id');
        delete req.session.form[req.model.id];
        return res.redirect(req.buildRoute('project.read', { projectId }));
      })
      .catch(next);
  });

  return app;
};
