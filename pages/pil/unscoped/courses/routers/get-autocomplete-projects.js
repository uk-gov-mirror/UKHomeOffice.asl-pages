const { Router } = require('express');

module.exports = () => {
  const app = Router({ mergeParams: true });

  app.get('/', (req, res, next) => {
    const { search } = req.query;
    const query = {
      status: 'active',
      search
    };
    req.api(`/establishment/${req.establishmentId}/projects`, { query })
      .then(response => {
        const options = (response.json.data || [])
          .filter(project => project.licenceNumber)
          .map(project => {
            return {
              label: project.licenceNumber,
              value: project.id
            };
          });
        res.json(options);
      })
      .catch(next);
  });

  return app;
};
