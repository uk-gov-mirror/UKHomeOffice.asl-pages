const { merge } = require('lodash');
const page = require('../../lib/page');
const { setEstablishment, setData, setDefaultSort } = require('../../lib/actions');
const pageContent = require('./content');
const moment = require('moment');

module.exports = ({ content } = {}) => {
  const app = page({
    root: __dirname,
    reducers: [
      'establishment',
      'list',
      'filters',
      'sort'
    ],
    schema: {
      id: {},
      title: {
        show: true
      },
      licenceHolder: {
        show: true,
        accessor: 'licenceHolder.name',
        title: 'Licence holder'
      },
      licenceNumber: {
        show: true,
        title: 'Licence number'
      },
      expiryDate: {
        show: true,
        title: 'Expiry date'
      }
    },
    pageContent: merge({}, pageContent, content)
  });

  app.get('/', (req, res, next) => {
    const today = moment().format('YYYY-MM-DD');
    const query = {
      expiryDate: {
        $gte: today
      }
    };
    req.api(`/establishment/${req.establishment}/projects`, { query })
      .then(response => {
        res.establishment = response.json.meta.establishment;
        res.data = response.json.data;
      })
      .then(() => next())
      .catch(next);
  });

  app.get('/', (req, res, next) => {
    res.store.dispatch(setEstablishment(res.establishment));
    res.store.dispatch(setData(res.data));
    res.store.dispatch(setDefaultSort({ column: 'expiryDate', ascending: true }));
    next();
  });

  return app;
};
