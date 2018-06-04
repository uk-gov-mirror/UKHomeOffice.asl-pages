const { merge } = require('lodash');
const page = require('../../lib/page');
const { setEstablishment, setData } = require('../../lib/actions');
const pageContent = require('./content');

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
      name: {
        show: true
      },
      roles: {
        show: true,
        exact: true
      },
      licence: {
        show: true
      },
      pil: {
        show: true,
        accessor: 'pil.licenceNumber'
      }
    },
    pageContent: merge({}, pageContent, content)
  });

  app.get('/', (req, res, next) => {
    req.api(`/establishment/${req.establishment}/profiles`)
      .then(response => {
        res.establishment = response.json.meta.establishment;
        res.data = response.json.data.map(profile => {
          const roles = profile.roles.map(r => r.type.toUpperCase());
          if (profile.pil) {
            roles.push('PILH');
          }
          return {
            ...profile,
            roles
          };
        });
      })
      .then(() => next())
      .catch(next);
  });

  app.get('/', (req, res, next) => {
    res.store.dispatch(setEstablishment(res.establishment));
    res.store.dispatch(setData(res.data));
    next();
  });

  return app;
};
