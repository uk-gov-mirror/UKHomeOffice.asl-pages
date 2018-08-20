const page = require('../../lib/page');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.get('/', (req, res, next) => {
    console.log('HOLA HOOPA');
    // req.api(`/establishment/${req.establishment}`)
    //   .then(response => {
    //     res.locals.static.establishment = response.json.data;
    //   })
    //   .then(() => next())
    //   .catch(next);

    next();
  });

  return app;
};
