const { get } = require('lodash');
const bodyParser = require('body-parser');
const { page } = require('@asl/service/ui');
const { datatable } = require('../../../common/routers');
const getSchema = require('./schema');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/', datatable({
    configure: (req, res, next) => {
      req.datatable.sort = { column: 'licenceHolder', ascending: true };
      req.datatable.schema = getSchema(req);
      next();
    },
    getApiPath: (req, res, next) => {
      const query = {
        year: req.year,
        filter: get(req.query, 'filters.*')
      };
      req.datatable.apiPath = [`/establishment/${req.establishmentId}/billing/pils`, { query }];
      next();
    }
  })({ defaultRowCount: 30 }));

  app.post('/', (req, res, next) => {
    const params = {
      method: 'post',
      json: {
        year: req.year,
        establishmentId: req.establishmentId,
        profileId: req.body.profileId,
        comment: req.body.comment,
        waived: req.body.waived === 'true'
      }
    };
    req.api(`/billing/waiver`, params)
      .then(() => {
        req.notification({ key: 'fee-waived-updated' });
        res.redirect(req.originalUrl);
      })
      .catch(next);
  });

  app.get('/history', (req, res, next) => {
    const params = {
      query: {
        year: req.year,
        establishmentId: req.establishmentId,
        profileId: req.query.profileId
      }
    };
    req.api(`/billing/waiver`, params)
      .then(response => {
        res.json(response.json.data);
      })
      .catch(next);
  });

  return app;
};
