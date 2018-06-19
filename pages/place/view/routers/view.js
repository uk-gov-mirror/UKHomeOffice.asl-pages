const { Router } = require('express');

module.exports = () => {
  const app = Router();

  app.get('/', (req, res, next) =>
    req.api(`/establishment/${req.establishment}/places/${req.place}`)
      .then(({ json: { data, meta } }) => {
        res.locals.static.establishment = meta.establishment;
        res.locals.item = {
          ...data,
          nacwo: data.nacwo && data.nacwo.profile.name
        };
      })
      .then(() => next())
      .catch(next)
  );

  return app;
};
