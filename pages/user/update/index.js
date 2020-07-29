const { get, merge, pick } = require('lodash');
const moment = require('moment');
const { page } = require('@asl/service/ui');
const { form } = require('../../common/routers');
const success = require('../../success');
const schema = require('./schema');
const { hydrate, updateDataFromTask, redirectToTaskIfOpen } = require('../../common/middleware');

const sendData = (req, params = {}) => {
  const values = req.session.form[req.model.id].values;
  const opts = {
    method: 'PUT',
    json: merge({
      data: pick(values, ['firstName', 'lastName', 'dob', 'telephone', 'telephoneAlt']),
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
        delete req.session.form[req.model.id];
        const task = get(response, 'json.data');
        req.session.success = { taskId: task.id };

        if (task.status === 'autoresolved') {
          delete req.session.profile;
          req.notification({ key: 'success' });
          return res.redirect(req.buildRoute('account.update'));
        }

        return res.redirect(req.buildRoute('account.update', { suffix: 'success' }));
      })
      .catch(next);
  });

  app.get('/success', success());

  return app;
};
