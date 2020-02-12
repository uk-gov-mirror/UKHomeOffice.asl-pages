const { get, merge, pick } = require('lodash');
const moment = require('moment');
const { page } = require('@asl/service/ui');
const { success, form } = require('../../common/routers');
const schema = require('./schema');
const { hydrate, updateDataFromTask, redirectToTaskIfOpen } = require('../../common/middleware');

const sendData = (req, params = {}) => {
  const values = req.session.form[req.model.id].values;
  const opts = {
    method: 'PUT',
    json: merge({
      data: pick(values, ['firstName', 'lastName', 'dob', 'telephone']),
      meta: { comments: values.comments }
    }, params)
  };
  return req.api(`/me`, opts);
};

module.exports = settings => {
  const app = page({
    root: __dirname,
    paths: ['/success']
  });

  app.use('/success', success({ licence: 'profile', type: 'amendment' }));

  app.get('/', hydrate());

  app.post('/', updateDataFromTask(sendData));

  app.use('/', form({
    schema,
    process: (req, res, next) => {
      const day = req.body['dob-day'];
      const month = req.body['dob-month'];
      const year = req.body['dob-year'];

      Object.assign(req.form.values, {
        dob: `${year}-${month}-${day}`
      });
      next();
    },
    saveValues: (req, res, next) => {
      req.session.form[req.model.id].values.dob = moment(req.form.values.dob, 'YYYY-MM-DD').format('YYYY-MM-DD');
      next();
    }
  }));

  app.post('/', redirectToTaskIfOpen());

  app.post('/', (req, res, next) => {
    sendData(req)
      .then(response => {
        const status = get(response, 'json.data.status');
        if (status === 'autoresolved') {
          req.notification({ key: 'success' });
          return next();
        }
        res.redirect(`${req.buildRoute('account.update')}/success`);
      })
      .catch(next);
  });

  app.post('/', (req, res, next) => {
    const id = req.model.id;

    delete req.session.form[id];
    delete req.session.profile;

    return res.redirect(req.buildRoute('account.update'));
  });

  return app;
};
