const { set, omit } = require('lodash');
const { page } = require('@asl/service/ui');
const { ropsYears } = require('../../../../constants');
const datatable = require('../../../common/routers/datatable');
const { redirectOnPost } = require('../middleware');
const schema = require('./schema');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use(datatable({
    configure: (req, res, next) => {
      const sortColumn = req.query.ropsStatus === 'submitted' ? 'ropsSubmittedDate' : 'ropsDeadline';
      req.datatable.sort = { column: sortColumn, ascending: true };
      req.datatable.schema = req.query.ropsStatus === 'submitted' ? omit(schema, 'ropsDeadline') : omit(schema, 'ropsSubmittedDate');
      next();
    },
    locals: (req, res, next) => {
      set(res.locals, 'static.ropsStatus', req.query.ropsStatus || 'outstanding');
      res.locals.static.ropsYears = ropsYears;
      next();
    },
    getApiPath: (req, res, next) => {
      const query = {
        ropsStatus: req.query.ropsStatus || 'outstanding',
        ropsYear: req.year
      };
      req.datatable.apiPath = [`/establishment/${req.establishmentId}/rops`, { query }];
      next();
    }
  })({ schema }));

  app.get('/', (req, res, next) => {
    const query = { ropsYear: req.year, establishmentId: req.establishmentId };
    return req.api(`/establishment/${req.establishmentId}/rops/overview`, { query })
      .then(response => {
        res.locals.static.ropsOverview = response.json.data;
      })
      .then(() => next())
      .catch(next);
  });

  app.use(redirectOnPost({ target: 'establishment.rops.overview' }));

  return app;
};
