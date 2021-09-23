const { page } = require('@asl/service/ui');
const { get } = require('lodash');
const moment = require('moment');
const form = require('../../../common/routers/form');
const content = require('./content');
const schema = require('./schema');

module.exports = () => {
  const app = page({ root: __dirname });

  app.use((req, res, next) => {
    req.model = {
      id: req.task.id,
      'ra-awerb-date': get(req.task, 'data.meta.ra-awerb-date')
    };
    res.locals.static.project = req.project;
    next();
  });

  app.use(form({
    schema,
    process: (req, res, next) => {
      const day = req.body['ra-awerb-date-day'];
      const month = req.body['ra-awerb-date-month'];
      const year = req.body['ra-awerb-date-year'];

      Object.assign(req.form.values, {
        'ra-awerb-date': `${year}-${month}-${day}`
      });
      next();
    },
    saveValues: (req, res, next) => {
      req.session.form[req.model.id].meta['ra-awerb-date'] = moment(req.form.values['ra-awerb-date'], 'YYYY-MM-DD').format('YYYY-MM-DD');
      req.session.form[req.model.id].meta.declaration = content.declaration;
      next();
    }
  }));

  app.post('/', (req, res, next) => {
    return res.redirect(req.buildRoute('task.read', { suffix: 'confirm' }));
  });

  return app;
};
