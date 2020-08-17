const { Router } = require('express');
const { form } = require('../../../../common/routers');

module.exports = () => {
  const app = Router({ mergeParams: true });

  app.use(form({
    getValues: (req, res, next) => {
      const projectId = req.form.values.projectId;
      req.api(`/establishment/${req.establishmentId}/projects/${projectId}`)
        .then(response => response.json.data)
        .then(project => {
          req.form.values.project = project;
          next();
        })
        .catch(next);
    }
  }));

  return app;
};
