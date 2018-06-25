const { pick } = require('lodash');
const page = require('../../../lib/page');
const { schema } = require('../schema');
const deleteRouter = require('../routers/delete');
const confirmRouter = require('../../common/routers/confirm');
const successRouter = require('../../common/routers/success');
const { getEstablishment } = require('../../common/helpers');

module.exports = settings => {
  const app = page({
    root: __dirname,
    paths: ['/confirm', '/success'],
    ...settings
  });

  app.use(deleteRouter());

  app.use((req, res, next) => {
    Object.assign(res.locals, { model: pick(req.model, Object.keys(schema)) });
    return next();
  });

  app.post('/', (req, res, next) => {
    return res.redirect(`${req.baseUrl}/confirm`);
  });

  app.use('/confirm', confirmRouter({
    model: 'place',
    schema,
    locals: (req, res, next) => {
      getEstablishment(req)
        .then(establishment => {
          res.locals.static.establishment = establishment;
        })
        .then(() => next())
        .catch(next);
    },
    submitChange: (req, res, next) => {
      // TODO: delete model
      return res.redirect(req.originalUrl.replace(/\/confirm/, '/success'));
    }
  }));

  app.use('/success', successRouter({ model: 'place' }));

  return app;
};
