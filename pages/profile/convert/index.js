const { get, isInteger } = require('lodash');
const { page } = require('@asl/service/ui');
const { form } = require('../../common/routers');
const schema = require('./schema');

module.exports = () => {
  const app = page({
    root: __dirname
  });

  app.use((req, res, next) => {
    req.model = {
      id: 'create-legacy-stub'
    };
    next();
  });

  app.use(form({
    schema,
    process: (req, res, next) => {
      const day = req.body['issueDate-day'];
      const month = req.body['issueDate-month'];
      const year = req.body['issueDate-year'];
      req.form.values.issueDate = `${year}-${month}-${day}`;

      const durationMonths = parseInt(req.body['months'], 10);
      const durationYears = parseInt(req.body['years'], 10);

      if (isInteger(durationMonths) && isInteger(durationYears)) {
        req.form.values.duration = {
          years: durationYears,
          months: durationMonths
        };
      }

      next();
    }
  }));

  app.post('/', (req, res, next) => {
    const { title, licenceNumber, issueDate, duration } = req.session.form[req.model.id].values;

    const params = {
      method: 'POST',
      json: {
        data: {
          establishmentId: req.establishmentId,
          licenceHolderId: req.profile.id,
          title,
          licenceNumber,
          issueDate: new Date(issueDate).toISOString(),
          version: {
            data: {
              title,
              duration
            }
          }
        }
      }
    };

    return req.api(`/project/create-stub`, params)
      .then(response => {
        const projectId = get(response, 'json.data.data.id');
        delete req.session.form[req.model.id];
        return res.redirect(req.buildRoute('project.read', { projectId }));
      })
      .catch(next);
  });

  return app;
};
