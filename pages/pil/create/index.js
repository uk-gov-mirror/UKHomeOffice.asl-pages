const page = require('../../../lib/page');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.post('/', (req, res, next) => {
    const { action } = req.query;

    if (action === 'catAF') {
      return Promise.resolve()
        // create empty PIL
        .then(() => req.api(`/establishment/${req.establishmentId}/profiles/${req.profileId}/pil`, { method: 'POST' }))
        // lookup created PIL
        .then(() => req.api(`/establishment/${req.establishmentId}/profiles/${req.profileId}`))
        .then(({ json: { data } }) => {
          return res.redirect(req.baseUrl.replace('create', `${data.pil.id}/edit`));
        })
        .catch(next);
    }
    if (action === 'catE') {
      // TODO: cat e
    }

    return next();

  });

  return app;
};
