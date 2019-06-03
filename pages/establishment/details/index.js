const { page } = require('@asl/service/ui');
const { get } = require('lodash');
const { form } = require('../../common/routers');
const schema = require('./schema');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use((req, res, next) => {
    req.breadcrumb('establishment.read');
    req.model = req.establishment;
    res.locals.static.asruUser = req.user.profile.asruUser;
    next();
  });

  app.use(form({ schema }))

  app.post('/', (req, res, next) => {
    const conditions = get(req.form, 'values.conditions');
    const params = {
      method: 'PUT',
      json: {
        data: { conditions }
      }
    }
    req.api(`/establishment/${req.establishmentId}/conditions`, params)
      .then(() => next())
      .catch(next)
  });

  // app.post((req, res, next) => {
  //
  // })

  return app;
};
