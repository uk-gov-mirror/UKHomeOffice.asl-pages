const moment = require('moment');
const { page } = require('@asl/service/ui');
const { form } = require('../../../../../common/routers');
const { buildModel } = require('../../../../../../lib/utils');
const confirm = require('./routers/confirm');
const schema = require('./schema');

module.exports = () => {
  const app = page({
    root: __dirname,
    paths: ['/confirm']
  });

  app.use((req, res, next) => {
    res.locals.static.course = req.trainingCourse;
    req.model = {
      id: 'new-participant',
      ...buildModel(schema)
    };
    next();
  });

  app.use(form({
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

  app.post('/', (req, res) => {
    res.redirect(`${req.buildRoute('pils.courses.participants.add')}/confirm`);
  });

  app.use('/confirm', confirm());

  return app;
};
